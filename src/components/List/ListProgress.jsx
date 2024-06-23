export default function ListProgress({totalLength, currentLength}) {
    
    return (
        <small className="ml-4">
            {`(${currentLength}/${totalLength})`}
        </small>
    )
}