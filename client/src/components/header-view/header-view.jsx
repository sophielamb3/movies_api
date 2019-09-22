import React from 'react';
import propTypes from 'prop-types';

export function HeaderView(props) {
  const { getMainView, getRegisterView, getLoginView } = props;

  return (
    <div className="header">
      <button type="button" onClick={() => getMainView()}>
        Home
      </button>
      <button type="button" onClick={() => getRegisterView()}>
        Register
      </button>
      <button type="button" onClick={() => getLoginView()}>
        Login
      </button>
    </div>
  );
}

HeaderView.propTypes = {
  getMainView: propTypes.func.isRequired,
  getRegisterView: propTypes.func.isRequired,
  getLoginView: propTypes.func.isRequired,
};
