import PropTypes from "prop-types"; // ES6
import { Link } from "react-router-dom";

const Card = ({ i, getImage }) => {
  console.log(getImage(i.images));

  function truncate(str) {
    return str.length > 12 ? str.substring(0, 12) + "..." : str;
  }

  const toRupiah = (price, options = {}) => {
    const dot = options.dot || '.';
    const formatter = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
    return formatter.format(price).replace(',', dot);
  };

  return (
    <div className="card w-60 h-[320px] shadow-xl glass text-white" key={i.id}>
      <figure>
        <img src={getImage(i.images)} className="h-36 w-full object-cover" />
      </figure>
      <div className="card-body h-32">
        <h2 className="card-title text-balance text-black">
          {truncate(i.product_name)}
        </h2>
        <div className="flex">
          <p className="text-black">{toRupiah(i.product_price)}</p>
          <p className="text-end text-black">⭐10K+</p>
        </div>
        <div className="card-actions justify-center">
          {/* <button className="btn btn-outline w-full mt-3 border-white text-white hover:bg-white hover:text-black"> */}
          <Link className="w-full" to={`/detail/${i.id}`}>
            <button className="btn btn-outline w-full mt-3 text-black font-light border-black transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-black hover:text-white duration-300">
              view details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
Card.propTypes = {
  i: PropTypes.object,
  getImage: PropTypes.func,
};
export default Card;
