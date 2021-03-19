import React from 'react';

const CardElement = (props) => {
  const showText = () => {
    let result = '';
    if (props.text != null && props.text.length > 0) {
      const val = props.text.toLowerCase().indexOf(props.query.toLowerCase());
      let val2 = props.text.slice(0, val).lastIndexOf(' ');
      val2 = val2 > 0 ? val2 : 0;

      result = props.text.slice(val2, val2 + 20) + '...';
    } else {
      result = 'Something went wrong';
    }
    return result;
  };
  return (
    <div className="h-80">
      <div className="p-2 object-contain">
        <figure className="block h-72 w-48 bg-gray-100 rounded-xl p-2">
          <img
            className="w-auto h-auto rounded-fu"
            src={`https://robohash.org/set_set1/bgset_bg1/${props.id}?size=200x200`}
            alt={`${props.id}`}
            width="200"
            height="200"
          />
          <div className=" pt-5 text-center space-y-4 p-2">
            <p className="text-lg">{showText()}</p>
          </div>
        </figure>
      </div>
    </div>
  );
};

export default CardElement;
