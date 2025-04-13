function PageDots({ activeIndex }) {
  const dots = [0, 1, 2];

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "8px", alignItems: "center", padding: "20px 28px 40px 28px" }}>
      {dots.map((dot, idx) => (
        <div
          key={idx}
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "#fff",
            opacity: idx === activeIndex ? 1 : idx === 1 ? 0.6 : 0.3,
            transition: "opacity 0.3s",
          }}
        />
      ))}
    </div>
  );
}

export default PageDots;