import React, { useState } from "react";

const Register = () => {
  const [photoFile, setPhotoFile] = useState(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState("");
  const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
  const [passwordError, setPasswordError] = useState("");

  const handlePhotoChange = (e) => {
    const file = e.target.files && e.target.files[0] ? e.target.files[0] : null;
    setPhotoFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreviewUrl(url);
    } else {
      setPhotoPreviewUrl("");
    }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const pwd = formData.get("password") || "";
    if (!passwordPattern.test(pwd)) {
      setPasswordError("Password must be 6+ chars with upper and lower case.");
      return;
    } else {
      setPasswordError("");
    }
    if (photoFile) {
      formData.set("photo", photoFile);
    }
    // Submit formData to your registration logic here
    // Example: await fetch('/api/register', { method: 'POST', body: formData })
    alert("Registration form submitted");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "40px 16px",
      }}
    >
      <form
        onSubmit={handleRegister}
        style={{
          width: "100%",
          maxWidth: 520,
          background: "var(--color-light-primary)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderRadius: 12,
          boxShadow: "0 6px 24px rgba(0,0,0,0.06)",
          padding: 24,
          fontFamily: "var(--font-secondary)",
        }}
      >
        <h2
          style={{
            margin: "0 0 16px 0",
            fontFamily: "var(--font-primary)",
            color: "var(--color-light-text)",
          }}
        >
          Create your account
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ color: "var(--color-light-text)" }}>
            <span style={{ display: "inline-block", marginBottom: 6 }}>
              User Name
            </span>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                outline: "none",
                background: "var(--color-light-secondary)",
              }}
            />
          </label>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 8,
              color: "var(--color-light-text)",
            }}
          >
            <label>
              <span style={{ display: "inline-block", marginBottom: 6 }}>
                User Photo
              </span>
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                style={{ width: "100%", padding: "8px 0" }}
              />
            </label>
            {photoPreviewUrl ? (
              <div
                style={{
                  width: "100%",
                  background: "var(--color-light-secondary)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 8,
                  padding: 8,
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <img
                  src={photoPreviewUrl}
                  alt="Selected preview"
                  style={{
                    width: 64,
                    height: 64,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
                <span style={{ fontSize: 12, opacity: 0.8 }}>
                  Preview of your selected image
                </span>
              </div>
            ) : null}
          </div>

          <label style={{ color: "var(--color-light-text)" }}>
            <span style={{ display: "inline-block", marginBottom: 6 }}>
              Email
            </span>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                outline: "none",
                background: "var(--color-light-secondary)",
              }}
            />
          </label>

          {passwordError ? (
            <div
              style={{
                color: "#c0392b",
                background: "rgba(192,57,43,0.08)",
                border: "1px solid rgba(192,57,43,0.25)",
                borderRadius: 8,
                padding: "8px 10px",
                marginTop: 4,
                marginBottom: 4,
                fontSize: 13,
              }}
            >
              {passwordError}
            </div>
          ) : null}

          <label style={{ color: "var(--color-light-text)" }}>
            <span style={{ display: "inline-block", marginBottom: 6 }}>
              Password
            </span>
            <input
              type="password"
              name="password"
              onInput={(e) => {
                const value = e.target.value || "";
                if (!passwordPattern.test(value)) {
                  setPasswordError(
                    "Password must be 6+ chars with upper and lower case."
                  );
                } else {
                  setPasswordError("");
                }
              }}
              required
              placeholder="Create a password"
              style={{
                width: "100%",
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.12)",
                outline: "none",
                background: "var(--color-light-secondary)",
              }}
            />
          </label>

          <button
            type="submit"
            style={{
              marginTop: 8,
              padding: "12px 16px",
              borderRadius: 10,
              border: "none",
              cursor: "pointer",
              background: "var(--color-light-accent)",
              color: "var(--color-light-text)",
              fontWeight: 700,
            }}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
