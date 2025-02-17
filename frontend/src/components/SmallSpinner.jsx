import { Oval } from 'react-loader-spinner';

export default function SmallSpinner() {
  return (
    <>
      <Oval
        visible={true}
        height="20"
        width="20"
        color="#0d5aa7"
        ariaLabel="oval-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </>
  );
}
