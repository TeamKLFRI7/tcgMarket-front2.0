const PageHeader = (props) => {
  return (
    <div style={styles.pageHead}>
      <h3>{props.title}</h3>
      <div style={styles.pageHeadImgContainer}>
        <img
          style={styles.pageHeadImg}
          src={props.img}
          alt={"Couverture de page"}
        />
      </div>
    </div>
  );
};

const styles = {
  pageHead: {
    height: "8rem",
    margin: "0 auto 2rem",
    width: "calc(100% - 2rem)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },

  pageHeadImgContainer: {
    width: "100%",
    height: "4rem",
    boxShadow: "rgba(0, 0, 0, 0.24) 0px 0px 8px",
    borderRadius: ".625rem",
    display: "flex",
    justifyContent: "center",
  },

  pageHeadImg: {
    height: "100%",
    width: "100%",
    borderRadius: ".625rem",
    objectFit: "contain",
  },
};

export default PageHeader;
