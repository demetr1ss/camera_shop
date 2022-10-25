import styles from './no-cameras.module.css';

function NoCameras() {
  return (
    <div className={styles.titleContent}>
      <h1 className="title title--h3">
        По вашему запросу ничего не найдено
      </h1>
    </div>
  );
}

export default NoCameras;
