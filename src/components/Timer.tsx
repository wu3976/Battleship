import "./Timer.css";

export type TimerPropType = {
    seconds: number
}
export default function Timer({ seconds } : TimerPropType) {
    const hh: number = Math.floor(seconds / 3600);
    let rem = seconds % 3600;
    const mm: number = Math.floor(rem / 60);
    rem %= 60;
    let ssstr = String(rem), mmstr = String(mm), hhstr = String(hh);
    while (ssstr.length < 2) {
        ssstr = "0" + ssstr;
    }
    while (mmstr.length < 2) {
        mmstr = "0" + mmstr;
    }
    while (hhstr.length < 2) {
        hhstr = "0" + hhstr;
    }
    return <div className="timer">
        {hhstr}:{mmstr}:{ssstr}
    </div>
}