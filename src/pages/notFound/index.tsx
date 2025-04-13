import NotFount from "../../assets/not-found-404.svg"

const NotFound = () => {
  return (
    <div>
      <img loading='lazy' src={NotFount} alt='' />
    </div>
  );
}

export default NotFound