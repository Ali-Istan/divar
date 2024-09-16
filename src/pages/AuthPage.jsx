import React, { useState } from "react";
import SendOtpFrom from "../components/templates/SendOtpFrom";
import CheckOtpForm from "../components/templates/CheckOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState("");
  return (
    <div>
      {step === 1 && (
        <SendOtpFrom setStep={setStep} setMobile={setMobile} mobile={mobile} />
      )}
      {step === 2 && (
        <CheckOtpForm
          code={code}
          setCode={setCode}
          setStep={setStep}
          mobile={mobile}
        />
      )}
    </div>
  );
}

export default AuthPage;
