import { faSpinner } from '@fortawesome/free-solid-svg-icons/faSpinner'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface LoaderProps {
  name?: string;
}



export default function Loader({ name }: LoaderProps) {
  return (
    <>
    <div className="rounded p-5 text-center">
                        <FontAwesomeIcon
                          icon={faSpinner}
                          spin
                          size="2x"
                          style={{ color: "#5a8a7a" }}
                          className="mb-3"
                        />
                        <h5 className="text-muted">Loading {name}...</h5>
                        <p className="text-muted mb-0">
                          Please wait while we fetch your data
                        </p>
        </div>
  </>
  )
}
