import { Oval } from 'react-loader-spinner';

export default function LoadingSpinner() {
    return (
        <>
            <Oval
                visible={true}
                height="80"
                width="80"
                color="#0d5aa7"
                ariaLabel="oval-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </>
    );
}
