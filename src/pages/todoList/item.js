import React from 'react';
import styles from './index.scss';

function Item(props) {
  const {data} = props;
  return (
    <div className={styles.item}>
      <input
        type='checkbox'
        checked={data.get('flag')}
        onChange={() => props.changeFlag(data.get('id'))}
      />
      <span>{data.get('data')}</span>
      <a className={styles.del} onClick={() => props.delItem(data.get('id'))}>
        删除
      </a>
    </div>
  );
}

export default Item;
