import { useNavigate } from 'react-router-dom';

export default function GoBackButton(){

    const navigate = useNavigate()
    
    const handleGoBack = () => {
        // Navigate back to the previous page
        navigate(-1);
      };
    
      return(
        <button onClick={handleGoBack}>Go Back</button>
      )
}

