import { useState, useEffect, useRef } from 'react';
import {
  collection, addDoc, updateDoc, deleteDoc,
  doc, onSnapshot, orderBy, query, serverTimestamp,
} from 'firebase/firestore';
import { signOut, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db, auth, CLOUDINARY_CLOUD_NAME, CLOUDINARY_UPLOAD_PRESET } from '../config';
import type { Property } from '../types';

/* ─── Types ─────────────────────────────────────────── */
type PropForm = Omit<Property, 'id'> & { id?: number | string };

const BLANK: PropForm = {
  title: '', location: '', price: '', size: '',
  beds: 1, baths: 1, image: '',
  type: 'condo', status: 'for-sale', featured: false, hidden: false,
  overview: '', highlights: [], amenities: [], images: [], mapUrl: '',
};

const LOCATIONS = ['Metro Manila', 'Cebu', 'Davao', 'Laguna', 'Cavite', 'Batangas'];

/* ─── Cloudinary helper ──────────────────────────────── */
async function uploadToCloudinary(file: File): Promise<string> {
  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_UPLOAD_PRESET) {
    throw new Error(
      'Cloudinary is not configured. Add VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET to your .env file.'
    );
  }
  const body = new FormData();
  body.append('file', file);
  body.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  body.append('folder', 'home/nadia-realestate');
  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    { method: 'POST', body }
  );
  if (!res.ok) throw new Error('Upload failed — check your Cloudinary preset settings.');
  const data = await res.json();
  return data.secure_url as string;
}

/* ─── Component ─────────────────────────────────────── */
export default function Dashboard() {
  const navigate = useNavigate();

  // data
  const [properties, setProperties] = useState<Property[]>([]);
  const [search,     setSearch]     = useState('');

  // view
  const [view,    setView]    = useState<'list' | 'form' | 'settings'>('list');
  const [form,    setForm]    = useState<PropForm>({ ...BLANK, highlights: [], amenities: [], images: [] });

  // form helpers
  const [hlInput,  setHlInput]  = useState('');
  const [amInput,  setAmInput]  = useState('');

  // status
  const [saving,      setSaving]      = useState(false);
  const [uploading,   setUploading]   = useState(0);       // # of images in-flight
  const [confirmDel,  setConfirmDel]  = useState<string | null>(null);
  const [error,       setError]       = useState('');

  // password change
  const [currentPw,  setCurrentPw]  = useState('');
  const [newPw,      setNewPw]      = useState('');
  const [confirmPw,  setConfirmPw]  = useState('');
  const [pwStatus,   setPwStatus]   = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [pwError,    setPwError]    = useState('');

  const fileRef = useRef<HTMLInputElement>(null);

  /* live Firestore listener */
  useEffect(() => {
    const q = query(collection(db, 'properties'), orderBy('createdAt', 'desc'));
    return onSnapshot(q, (snap) => {
      setProperties(snap.docs.map(d => ({ ...d.data(), id: d.id })) as Property[]);
    });
  }, []);

  /* ── helpers ── */
  const setField = (key: keyof PropForm, val: unknown) =>
    setForm(prev => ({ ...prev, [key]: val }));

  const openAdd = () => {
    setForm({ ...BLANK, highlights: [], amenities: [], images: [] });
    setHlInput(''); setAmInput('');
    setError(''); setView('form');
  };

  const openEdit = (p: Property) => {
    setForm({ ...p, highlights: p.highlights ?? [], amenities: p.amenities ?? [], images: p.images ?? [] });
    setHlInput(''); setAmInput('');
    setError(''); setView('form');
  };

  const goBack = () => { setView('list'); setError(''); };

  /* ── save ── */
  async function handleSave() {
    if (!form.title.trim() || !form.location || !form.price.trim()) {
      setError('Title, Location and Price are required.'); return;
    }
    setSaving(true); setError('');
    try {
      const { id, ...data } = form;
      const imgs = data.images ?? [];
      const payload = {
        ...data,
        image: imgs[0] ?? data.image ?? '',
        images: imgs,
        highlights: data.highlights ?? [],
        amenities:  data.amenities  ?? [],
      };
      if (id) {
        await updateDoc(doc(db, 'properties', id as string), { ...payload, updatedAt: serverTimestamp() });
      } else {
        await addDoc(collection(db, 'properties'), { ...payload, createdAt: serverTimestamp() });
      }
      goBack();
    } catch {
      setError('Save failed. Check your connection and try again.');
    } finally {
      setSaving(false);
    }
  }

  /* ── delete ── */
  async function handleDelete(id: number | string) {
    try {
      await deleteDoc(doc(db, 'properties', id as string));
      setConfirmDel(null);
    } catch {
      setError('Delete failed.');
    }
  }

  /* ── visibility toggle ── */
  async function handleToggleHidden(p: Property) {
    try {
      await updateDoc(doc(db, 'properties', p.id as string), {
        hidden: !p.hidden,
        updatedAt: serverTimestamp(),
      });
    } catch {
      setError('Could not update visibility.');
    }
  }

  /* ── image upload ── */
  async function handleFiles(files: FileList | null) {
    if (!files || !files.length) return;
    setUploading(prev => prev + files.length);
    const urls: string[] = [];
    for (const file of Array.from(files)) {
      try {
        urls.push(await uploadToCloudinary(file));
      } catch (e: unknown) {
        setError(e instanceof Error ? e.message : 'Upload error');
      }
    }
    setUploading(prev => prev - files.length);
    setForm(prev => {
      const merged = [...(prev.images ?? []), ...urls];
      return { ...prev, images: merged, image: merged[0] ?? prev.image };
    });
  }

  const removeImage = (i: number) => {
    setForm(prev => {
      const imgs = (prev.images ?? []).filter((_, idx) => idx !== i);
      return { ...prev, images: imgs, image: imgs[0] ?? '' };
    });
  };

  /* ── tag helpers ── */
  const addHL = () => {
    const v = hlInput.trim(); if (!v) return;
    setField('highlights', [...(form.highlights ?? []), v]);
    setHlInput('');
  };
  const removeHL = (i: number) =>
    setField('highlights', (form.highlights ?? []).filter((_, idx) => idx !== i));

  const addAM = () => {
    const v = amInput.trim(); if (!v) return;
    setField('amenities', [...(form.amenities ?? []), v]);
    setAmInput('');
  };
  const removeAM = (i: number) =>
    setField('amenities', (form.amenities ?? []).filter((_, idx) => idx !== i));

  /* ── logout ── */
  const handleLogout = async () => { await signOut(auth); navigate('/login'); };

  /* ── settings ── */
  const openSettings = () => {
    setCurrentPw(''); setNewPw(''); setConfirmPw('');
    setPwStatus('idle'); setPwError('');
    setView('settings');
  };

  const handleChangePassword = async () => {
    if (!currentPw) { setPwError('Please enter your current password.'); return; }
    if (newPw.length < 6) { setPwError('New password must be at least 6 characters.'); return; }
    if (newPw !== confirmPw) { setPwError("New passwords don't match."); return; }
    setPwStatus('loading'); setPwError('');
    try {
      const user = auth.currentUser!;
      const credential = EmailAuthProvider.credential(user.email!, currentPw);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPw);
      setPwStatus('success');
      setCurrentPw(''); setNewPw(''); setConfirmPw('');
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update password.';
      setPwError(msg.includes('wrong-password') || msg.includes('invalid-credential')
        ? 'Current password is incorrect.'
        : msg);
      setPwStatus('error');
    }
  };

  /* ── filtered list ── */
  const visible = properties.filter(p =>
    !search ||
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.location.toLowerCase().includes(search.toLowerCase())
  );

  const isEditing = !!(form as Property).id;

  /* ═══════════════════════════════════════════════════ */
  return (
    <div className="dashboard-wrap">

      {/* ── Header ── */}
      <header className="dash-header">
        <span className="dash-logo">NadiaCagayRealty</span>
        <span className="dash-header-title">Property Dashboard</span>
        <button className="dash-settings-btn" onClick={openSettings} title="Settings">⚙ Settings</button>
        <button className="dash-logout-btn" onClick={handleLogout}>Logout</button>
      </header>

      <div className="dash-body">

        {/* ════ LIST VIEW ════ */}
        {view === 'list' && (
          <>
            <div className="dash-toolbar">
              <h2 className="dash-section-title">
                Properties <span className="dash-count">{properties.length}</span>
              </h2>
              <div className="dash-toolbar-right">
                <input
                  className="dash-search"
                  placeholder="Search by title or location…"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                />
                <button className="dash-add-btn" onClick={openAdd}>+ Add Property</button>
              </div>
            </div>

            {error && <div className="dash-error">{error}</div>}

            <div className="prop-table-wrap">
              <table className="prop-table">
                <thead>
                  <tr>
                    <th>Property</th>
                    <th>Location</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Price</th>
                    <th>Featured</th>
                    <th>Visible</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {visible.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="prop-table-empty">
                        {properties.length === 0
                          ? 'No properties yet — click "+ Add Property" to get started.'
                          : 'No results match your search.'}
                      </td>
                    </tr>
                  ) : visible.map(p => (
                    <tr key={p.id} className={p.hidden ? 'prop-hidden-row' : ''}>
                      <td>
                        <div className="prop-table-title-cell">
                          {p.image && <img src={p.image} alt="" className="prop-table-thumb" />}
                          <span>{p.title}</span>
                        </div>
                      </td>
                      <td>{p.location}</td>
                      <td><span className={`prop-badge type-${p.type}`}>{p.type}</span></td>
                      <td><span className={`prop-badge status-${p.status ?? 'for-sale'}`}>{p.status ?? 'for-sale'}</span></td>
                      <td className="prop-price-cell">{p.price}</td>
                      <td>{p.featured
                        ? <span className="prop-feat-yes">★ Yes</span>
                        : <span className="prop-feat-no">—</span>}
                      </td>
                      <td>
                        <button
                          className={`prop-vis-btn${p.hidden ? ' is-hidden' : ''}`}
                          onClick={() => handleToggleHidden(p)}
                          title={p.hidden ? 'Property is hidden — click to show' : 'Property is visible — click to hide'}
                        >
                          {p.hidden ? '🚫 Hidden' : '👁 Visible'}
                        </button>
                      </td>
                      <td>
                        <div className="prop-actions">
                          <button className="prop-edit-btn" onClick={() => openEdit(p)}>Edit</button>
                          {confirmDel === String(p.id) ? (
                            <>
                              <span className="prop-confirm-text">Sure?</span>
                              <button className="prop-confirm-yes" onClick={() => handleDelete(p.id)}>Yes</button>
                              <button className="prop-confirm-no" onClick={() => setConfirmDel(null)}>No</button>
                            </>
                          ) : (
                            <button className="prop-delete-btn" onClick={() => setConfirmDel(String(p.id))}>Delete</button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {/* ════ SETTINGS VIEW ════ */}
        {view === 'settings' && (
          <>
            <div className="dash-toolbar">
              <h2 className="dash-section-title">Settings</h2>
              <button className="dash-back-btn" onClick={() => setView('list')}>← Back to Properties</button>
            </div>

            <div className="dash-settings-panel">
              <h3 className="dash-settings-heading">🔒 Change Password</h3>

              {pwStatus === 'success' && (
                <div className="dash-pw-success">
                  ✅ Password updated successfully!
                </div>
              )}
              {pwError && (
                <div className="dash-pw-error">{pwError}</div>
              )}

              <div className="dash-pw-form">
                <div className="form-field">
                  <label className="form-label">Current Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Enter current password"
                    value={currentPw}
                    onChange={e => { setCurrentPw(e.target.value); setPwError(''); setPwStatus('idle'); }}
                    autoComplete="current-password"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="At least 6 characters"
                    value={newPw}
                    onChange={e => { setNewPw(e.target.value); setPwError(''); setPwStatus('idle'); }}
                    autoComplete="new-password"
                  />
                </div>
                <div className="form-field">
                  <label className="form-label">Confirm New Password</label>
                  <input
                    type="password"
                    className="form-input"
                    placeholder="Repeat new password"
                    value={confirmPw}
                    onChange={e => { setConfirmPw(e.target.value); setPwError(''); setPwStatus('idle'); }}
                    autoComplete="new-password"
                  />
                </div>

                <button
                  className="dash-pw-submit-btn"
                  onClick={handleChangePassword}
                  disabled={pwStatus === 'loading'}
                >
                  {pwStatus === 'loading' ? 'Updating…' : 'Update Password'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* ════ FORM VIEW ════ */}
        {view === 'form' && (
          <>
            <div className="dash-toolbar">
              <h2 className="dash-section-title">
                {isEditing ? 'Edit Property' : 'Add New Property'}
              </h2>
              <button className="dash-cancel-btn" onClick={goBack}>← Back to List</button>
            </div>

            {error && <div className="dash-error">{error}</div>}

            <div className="prop-form">

              {/* ── Basic Info ── */}
              <div className="form-section-label">Basic Information</div>
              <div className="form-grid">

                <div className="form-group form-full">
                  <label>Title *</label>
                  <input value={form.title} onChange={e => setField('title', e.target.value)} placeholder="e.g. BE Uptown Park" />
                </div>

                <div className="form-group">
                  <label>Location *</label>
                  <select value={form.location} onChange={e => setField('location', e.target.value)}>
                    <option value="">Select location…</option>
                    {LOCATIONS.map(l => <option key={l} value={l}>{l}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Property Type</label>
                  <select value={form.type} onChange={e => setField('type', e.target.value as Property['type'])}>
                    <option value="condo">Condo</option>
                    <option value="house">House &amp; Lot</option>
                    <option value="apartment">Apartment</option>
                    <option value="commercial">Commercial</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select value={form.status} onChange={e => setField('status', e.target.value as Property['status'])}>
                    <option value="for-sale">For Sale</option>
                    <option value="for-rent">For Rent</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Price *</label>
                  <input value={form.price} onChange={e => setField('price', e.target.value)} placeholder="e.g. ₱850,000 or Contact for Price" />
                </div>

                <div className="form-group">
                  <label>Size</label>
                  <input value={form.size} onChange={e => setField('size', e.target.value)} placeholder="e.g. 2,400 sq ft" />
                </div>

                <div className="form-group">
                  <label>Bedrooms</label>
                  <input type="number" min={0} value={form.beds} onChange={e => setField('beds', Number(e.target.value))} />
                </div>

                <div className="form-group">
                  <label>Bathrooms</label>
                  <input type="number" min={0} step={0.5} value={form.baths} onChange={e => setField('baths', Number(e.target.value))} />
                </div>

                <div className="form-group form-full">
                  <label className="form-check-wrap">
                    <input
                      type="checkbox"
                      checked={!!form.featured}
                      onChange={e => setField('featured', e.target.checked)}
                    />
                    <span>Feature this property on the homepage</span>
                  </label>
                </div>

                <div className="form-group form-full">
                  <label className="form-check-wrap form-check-warn">
                    <input
                      type="checkbox"
                      checked={!!form.hidden}
                      onChange={e => setField('hidden', e.target.checked)}
                    />
                    <span>Hide this property from the website</span>
                  </label>
                </div>
              </div>

              {/* ── Overview ── */}
              <div className="form-section-label" style={{ marginTop: 28 }}>Overview</div>
              <div className="form-group">
                <textarea
                  value={form.overview ?? ''}
                  onChange={e => setField('overview', e.target.value)}
                  placeholder="Write a detailed description of the property…"
                  rows={4}
                />
              </div>

              {/* ── Google Maps URL ── */}
              <div className="form-section-label" style={{ marginTop: 28 }}>Location (Google Maps)</div>
              <div className="form-group">
                <input
                  value={(form as Property & { mapUrl?: string }).mapUrl ?? ''}
                  onChange={e => setField('mapUrl', e.target.value)}
                  placeholder="Paste any Google Maps link — e.g. https://maps.app.goo.gl/..."
                />
                <span className="form-hint">
                  Open Google Maps → find the property → Share → Copy link → paste here.
                  Works with short links, full place URLs, or bare coordinates (lat,lng).
                </span>
              </div>

              {/* ── Highlights ── */}
              <div className="form-section-label" style={{ marginTop: 28 }}>Highlights</div>
              <div className="form-tags">
                {(form.highlights ?? []).map((h, i) => (
                  <span key={i} className="form-tag">
                    {h}<button type="button" onClick={() => removeHL(i)}>×</button>
                  </span>
                ))}
              </div>
              <div className="form-tag-row">
                <input
                  value={hlInput}
                  onChange={e => setHlInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addHL(); } }}
                  placeholder="Add a highlight and press Enter"
                />
                <button type="button" className="form-tag-add" onClick={addHL}>Add</button>
              </div>

              {/* ── Amenities ── */}
              <div className="form-section-label" style={{ marginTop: 28 }}>Amenities</div>
              <div className="form-tags">
                {(form.amenities ?? []).map((a, i) => (
                  <span key={i} className="form-tag">
                    {a}<button type="button" onClick={() => removeAM(i)}>×</button>
                  </span>
                ))}
              </div>
              <div className="form-tag-row">
                <input
                  value={amInput}
                  onChange={e => setAmInput(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addAM(); } }}
                  placeholder="Add an amenity and press Enter"
                />
                <button type="button" className="form-tag-add" onClick={addAM}>Add</button>
              </div>

              {/* ── Photos ── */}
              <div className="form-section-label" style={{ marginTop: 28 }}>Photos (via Cloudinary)</div>
              <div
                className="img-dropzone"
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
              >
                {uploading > 0
                  ? <p>Uploading {uploading} image{uploading > 1 ? 's' : ''}…</p>
                  : <>
                      <p>Drag &amp; drop images here, or <u>click to browse</u></p>
                      <span>PNG · JPG · WEBP · multiple files allowed</span>
                    </>
                }
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={e => { handleFiles(e.target.files); e.target.value = ''; }}
                />
              </div>

              {(form.images ?? []).length > 0 && (
                <div className="img-preview-grid">
                  {(form.images ?? []).map((url, i) => (
                    <div key={i} className="img-preview-item">
                      <img src={url} alt={`preview ${i + 1}`} />
                      {i === 0 && <span className="img-main-badge">Main</span>}
                      <button type="button" className="img-remove-btn" onClick={() => removeImage(i)}>×</button>
                    </div>
                  ))}
                </div>
              )}

              {/* ── Actions ── */}
              <div className="form-actions">
                <button type="button" className="form-cancel-btn" onClick={goBack}>Cancel</button>
                <button type="button" className="form-save-btn" onClick={handleSave} disabled={saving || uploading > 0}>
                  {saving ? 'Saving…' : isEditing ? 'Update Property' : 'Save Property'}
                </button>
              </div>

            </div>
          </>
        )}
      </div>
    </div>
  );
}
