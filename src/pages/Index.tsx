
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const isOnboarded = localStorage.getItem("onboarded");
    
    if (isOnboarded === "true") {
      navigate("/dashboard");
    } else {
      navigate("/onboarding");
    }
  }, [navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-primary mb-2">Gentle Motion</h1>
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Index;
