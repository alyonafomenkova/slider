interface JQuery {
  runForSlider(method: string, ...args: any): JQuery;
  setMin(value: number): JQuery;
  setMax(value: number): JQuery;
  setFrom(value: number): JQuery;
  setTo(value: number): JQuery;
  setMinListener(listener: (min: number) => void): JQuery;
  setMaxListener(listener: (max: number) => void): JQuery;
  setFromListener(listener: (from: number) => void): JQuery;
  setToListener(listener: (to: number) => void): JQuery;
  setStepListener(listener: (step: number) => void): JQuery;
  setStep(value: number): JQuery;
  setScale(value: boolean): JQuery;
  setPointerValue(value: boolean): JQuery;
  setType(value: boolean): JQuery;
  setOrientation(value: boolean): JQuery;
}
