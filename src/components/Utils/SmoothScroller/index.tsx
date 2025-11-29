// interface
interface Props {
    children: React.ReactNode
}

export default function SmoothScroller({
    children
}: Props) {
  
    return (
        <div id='viewport'>
            <div id='main-content'>
                {children}
            </div>
        </div>
    )
}