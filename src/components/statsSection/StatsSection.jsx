import { useEffect, useState, useRef } from "react";
import "./StatsSection.css";

const stats = [
  { value: 15, label: "year+", title: "Experience" },
  { value: 10, label: "R&D", title: "Personnel" },
  { value: 150, label: "product", title: "Specification" },
  { value: 50, label: "people+", title: "Team Service" },
];

const StatCard = ({ value, label, title }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  // 1. مراقبة العنصر: هل ظهر على الشاشة؟
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 } // يبدأ العمل عندما يظهر 30% من القسم
    );

    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, []);

  // 2. تشغيل العداد فقط إذا كان isVisible = true
  useEffect(() => {
    if (!isVisible) return;

    let start = 0;
    const duration = 2000; 
    const incrementTime = 30;
    const totalSteps = duration / incrementTime;
    const increment = value / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div className="stat-card" ref={cardRef}>
      <h3>
        <span className="stat-value">{count}</span>
        <small>{label}</small>
      </h3>
      <p>{title}</p>
    </div>
  );
};

const StatsSection = () => {
  return (
    <section className="stats-section">
      <div className="stats-container">
        {stats.map((item, index) => (
          <StatCard
            key={index}
            value={item.value}
            label={item.label}
            title={item.title}
          />
        ))}
      </div>
    </section>
  );
};

export default StatsSection;