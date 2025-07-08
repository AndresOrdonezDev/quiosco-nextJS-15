
export default function Heading({children}: {children:React.ReactNode}) {
    return (
        <h1
            className="font-bold text-xl mb-10"
        >
           {children}
        </h1>
    )
}
