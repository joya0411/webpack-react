import React from 'react';
import PropTypes from 'prop-types';
import Item from './item';

function List(props) {
  const {data} = props;
  return data.map((item) => (
    <Item
      key={item.get('id')}
      data={item}
      changeFlag={props.changeFlag}
      delItem={props.delItem}
    />
  ));
}

List.propTypes = {
  data: PropTypes.object,
};

export default List;
