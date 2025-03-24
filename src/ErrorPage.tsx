const errCodeMap = {
    "404": "Page Not Found"
};

export type ErrorPagePropType = {
    errCode: number,
    message: string
};

export default function ErrorPage({errCode, message} : ErrorPagePropType) {
    return <div>
        <h1>{errCode} {errCodeMap[String(errCode) as keyof typeof errCodeMap] || ""}</h1>
        <div>{message}</div>
    </div>
}