import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

  // Core E-Commerce Profile States
  const [profileData, setProfileData] = useState({
    userId: "",
    createdAt: "",
    name: "",
    email: "",
    address: "",
    moNumber: "",
    isDefaultAddress: true,
    isPrimaryPhone: true
  });

  // UI Flow Control Systems
  const [activeSection, setActiveSection] = useState("overview"); // overview | edit
  const [editForm, setEditForm] = useState({ name: "", email: "", password: "", address: "", moNumber: "", isDefaultAddress: true, isPrimaryPhone: true });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });
  const [validationErrors, setValidationErrors] = useState({});
  const [capsLock, setCapsLock] = useState(false);

  const getAuthConfig = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: token ? `Bearer ${token}` : "" } };
  };

  // Fetch Live Secure Profile Records
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/api/users/profile", getAuthConfig());
        
        const user = response.data?.data || response.data;
        
        const structuredData = {
          userId: user.userId || user._id || "N/A",
          createdAt: user.createdAt 
            ? new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "numeric" }) 
            : "N/A",
          name: user.name || "",
          email: user.email || "",
          address: user.address || "",
          moNumber: user.moNumber || "",
          isDefaultAddress: user.isDefaultAddress ?? true,
          isPrimaryPhone: user.isPrimaryPhone ?? true
        };

        setProfileData(structuredData);
        setEditForm({
          name: structuredData.name,
          email: structuredData.email,
          password: "",
          address: structuredData.address,
          moNumber: structuredData.moNumber,
          isDefaultAddress: structuredData.isDefaultAddress,
          isPrimaryPhone: structuredData.isPrimaryPhone
        });
      } catch (err) {
        console.error("Profile Synchronization Error:", err);
        setFeedback({ type: "error", message: "Failed to load active secure database logs." });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Check for Caps Lock (Security awareness feature for password inputs)
  const checkCapsLock = (e) => {
    if (e.getModifierState("CapsLock")) {
      setCapsLock(true);
    } else {
      setCapsLock(false);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!editForm.name.trim()) errors.name = "Name field is required.";
    if (!editForm.email.trim()) {
      errors.email = "Account email mapping is required.";
    } else if (!/\S+@\S+\.\S+/.test(editForm.email)) {
      errors.email = "Invalid email formatting syntax.";
    }
    if (!editForm.address.trim()) errors.address = "Shipping address location is required.";
    if (!editForm.moNumber.trim()) {
      errors.moNumber = "Mobile number is required.";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(editForm.moNumber.trim())) {
      errors.moNumber = "Invalid contact numeric syntax.";
    }
    if (editForm.password && editForm.password.length < 6) {
      errors.password = "Password must exceed 5 characters.";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFeedback({ type: "", message: "" });
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: editForm.name.trim(),
        email: editForm.email.trim(),
        address: editForm.address.trim(),
        moNumber: editForm.moNumber.trim(),
        isDefaultAddress: editForm.isDefaultAddress,
        isPrimaryPhone: editForm.isPrimaryPhone
      };
      if (editForm.password) payload.password = editForm.password;

      const response = await axios.put("http://localhost:8080/api/users/profile", payload, getAuthConfig());
      const updatedUser = response.data?.data || response.data;

      const updatedState = {
        ...profileData,
        name: updatedUser.name || editForm.name,
        email: updatedUser.email || editForm.email,
        address: updatedUser.address || editForm.address,
        moNumber: updatedUser.moNumber || editForm.moNumber,
        isDefaultAddress: updatedUser.isDefaultAddress ?? editForm.isDefaultAddress,
        isPrimaryPhone: updatedUser.isPrimaryPhone ?? editForm.isPrimaryPhone
      };
      
      setProfileData(updatedState);
      localStorage.setItem("user", JSON.stringify(updatedState));
      setFeedback({ type: "success", message: "E-Commerce credentials updated successfully." });
      setActiveSection("overview");
    } catch (err) {
      setFeedback({ type: "error", message: "Handshake rejected. Failed to push update vectors." });
    } finally {
      setLoading(false);
    }
  };

  const userInitial = profileData.name ? profileData.name.charAt(0).toUpperCase() : "?";

  if (loading && !profileData.email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="text-center">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Syncing Parameters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300">
      {/* BALANCED MEDIUM-SIZED CARD CONTAINER */}
      <div className="max-w-3xl mx-auto bg-white border border-gray-200/90 rounded-2xl shadow-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header Banner Section */}
        <div className="bg-[#0F172A] px-6 py-5 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-xl font-black text-white shadow-lg shadow-blue-500/20">
              {userInitial}
            </div>
            <div>
              <h2 className="text-base font-bold tracking-tight text-white">{profileData.name || "E-Commerce Profile"}</h2>
              <p className="text-xs font-mono text-gray-400 mt-0.5">{profileData.email}</p>
            </div>
          </div>
          <div className="text-right font-mono text-[10px] text-gray-400 hidden sm:block space-y-0.5">
            <p>REF NO: <span className="text-gray-200 select-all font-semibold">{profileData.userId}</span></p>
            <p>CREATED: <span className="text-gray-200">{profileData.createdAt}</span></p>
          </div>
        </div>

        {/* Tab Selection Row */}
        <div className="flex border-b border-gray-100 bg-slate-50/50 px-6 pt-3.5 gap-6 text-xs font-bold uppercase tracking-wider text-gray-400">
          <button 
            type="button"
            onClick={() => { setActiveSection("overview"); setFeedback({ type: "", message: "" }); }}
            className={`pb-3 transition-all relative font-extrabold ${activeSection === "overview" ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600" : "hover:text-gray-900"}`}
          >
            Overview Profile
          </button>
          <button 
            type="button"
            onClick={() => { setActiveSection("edit"); setFeedback({ type: "", message: "" }); }}
            className={`pb-3 transition-all relative font-extrabold ${activeSection === "edit" ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600" : "hover:text-gray-900"}`}
          >
            Modify Settings
          </button>
        </div>

        {/* Card Body Space */}
        <div className="p-6 sm:p-8">
          
          {/* Feedback Display Banners */}
          {feedback.message && (
            <div className={`p-3.5 rounded-xl text-xs font-mono border mb-5 flex items-center gap-2.5 shadow-sm ${
              feedback.type === "success" ? "bg-emerald-50/60 text-emerald-700 border-emerald-100" : "bg-rose-50/60 text-rose-700 border-rose-100"
            }`}>
              <span className="font-bold">{feedback.type === "success" ? "[SUCCESS]" : "[ERROR]"}</span> {feedback.message}
            </div>
          )}

          {activeSection === "overview" ? (
            /* CONSOLIDATED INFORMATION DIAL VIEW */
            <div className="space-y-5 animate-in fade-in duration-200 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 border-b border-gray-100 pb-5">
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-gray-400 text-[10px]">Username Identity</span>
                  <span className="block font-semibold text-gray-900 mt-1 text-sm">{profileData.name || "—"}</span>
                </div>
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-gray-400 text-[10px]">Email Mapping</span>
                  <span className="block font-semibold text-gray-900 mt-1 text-sm truncate">{profileData.email || "—"}</span>
                </div>
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-gray-400 text-[10px]">Mobile Connection</span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-semibold text-gray-900 text-sm">{profileData.moNumber || "—"}</span>
                    {profileData.isPrimaryPhone && <span className="bg-blue-50 text-blue-600 px-1.5 py-0.5 text-[9px] uppercase font-bold rounded-md tracking-wider">Primary</span>}
                  </div>
                </div>
                <div>
                  <span className="font-extrabold uppercase tracking-wider text-gray-400 text-[10px]">Shipping Address Domain</span>
                  <div className="mt-1">
                    <span className="font-semibold text-gray-900 text-sm block leading-relaxed">{profileData.address || "—"}</span>
                    {profileData.isDefaultAddress && <span className="inline-block bg-slate-100 text-slate-700 px-1.5 py-0.5 text-[9px] uppercase font-bold rounded-md mt-1 tracking-wider">Default Shipping</span>}
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={() => setActiveSection("edit")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition shadow-sm active:scale-95"
                >
                  Edit Profile parameters
                </button>
              </div>
            </div>
          ) : (
            /* COMPACT REGISTRATION-STYLE FORM VIEWPORT */
            <form onSubmit={handleFormSubmit} className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Full Name */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name}
                    onChange={handleInputChange}
                    className={`w-full bg-[#F8FAFC] border p-2.5 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition duration-150 ${
                      validationErrors.name ? "border-rose-400 focus:ring-rose-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                  />
                  {validationErrors.name && <p className="text-rose-600 text-xs mt-1 font-semibold">{validationErrors.name}</p>}
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Email Mapping</label>
                  <input
                    type="email"
                    name="email"
                    value={editForm.email}
                    onChange={handleInputChange}
                    className={`w-full bg-[#F8FAFC] border p-2.5 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition duration-150 ${
                      validationErrors.email ? "border-rose-400 focus:ring-rose-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                  />
                  {validationErrors.email && <p className="text-rose-600 text-xs mt-1 font-semibold">{validationErrors.email}</p>}
                </div>

                {/* Mobile Contact Settings */}
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    name="moNumber"
                    value={editForm.moNumber}
                    onChange={handleInputChange}
                    className={`w-full bg-[#F8FAFC] border p-2.5 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition duration-150 ${
                      validationErrors.moNumber ? "border-rose-400 focus:ring-rose-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                    placeholder="+91 XXXXX XXXXX"
                  />
                  <label className="flex items-center gap-2 mt-1.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      name="isPrimaryPhone"
                      checked={editForm.isPrimaryPhone}
                      onChange={handleInputChange}
                      className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500/20"
                    />
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Set as primary phone alert</span>
                  </label>
                  {validationErrors.moNumber && <p className="text-rose-600 text-xs mt-1 font-semibold">{validationErrors.moNumber}</p>}
                </div>

                {/* Security Password Update with CapsLock Flag */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400">Security Password</label>
                    {editForm.password && (
                      <span className="text-[9px] font-bold uppercase text-gray-400 tracking-wider">
                        Len: <b className={editForm.password.length < 6 ? "text-rose-500" : "text-emerald-500"}>{editForm.password.length}</b>
                      </span>
                    )}
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={editForm.password}
                    onChange={handleInputChange}
                    onKeyUp={checkCapsLock}
                    className={`w-full bg-[#F8FAFC] border p-2.5 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition duration-150 ${
                      validationErrors.password ? "border-rose-400 focus:ring-rose-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                    }`}
                    placeholder="••••••••"
                  />
                  {capsLock && <p className="text-amber-500 text-[10px] mt-1 font-bold uppercase tracking-wide">⚠️ Warning: Caps Lock Active</p>}
                  {validationErrors.password && <p className="text-rose-600 text-xs mt-1 font-semibold">{validationErrors.password}</p>}
                </div>

              </div>

              {/* Physical Delivery Destination text field */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Permanent Location Address</label>
                <textarea
                  name="address"
                  rows="2"
                  value={editForm.address}
                  onChange={handleInputChange}
                  className={`w-full bg-[#F8FAFC] border p-2.5 rounded-xl text-sm font-medium focus:bg-white focus:outline-none focus:ring-4 transition duration-150 resize-none ${
                    validationErrors.address ? "border-rose-400 focus:ring-rose-100" : "border-gray-200 focus:border-blue-500 focus:ring-blue-500/10"
                  }`}
                />
                <label className="flex items-center gap-2 mt-1.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    name="isDefaultAddress"
                    checked={editForm.isDefaultAddress}
                    onChange={handleInputChange}
                    className="w-3.5 h-3.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500/20"
                  />
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Set as default 1-click checkout destination</span>
                </label>
                {validationErrors.address && <p className="text-rose-600 text-xs mt-1 font-semibold">{validationErrors.address}</p>}
              </div>

              {/* Action Buttons Row */}
              <div className="flex justify-end gap-3 pt-3 border-t border-gray-100 mt-4">
                <button
                  type="button"
                  onClick={() => { setActiveSection("overview"); setValidationErrors({}); }}
                  className="px-4 py-2 border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold uppercase tracking-wider rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition shadow-sm flex items-center gap-2 disabled:opacity-50 active:scale-95"
                >
                  Save Details
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}