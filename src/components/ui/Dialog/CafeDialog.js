import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import AddMenuForm from "../../AddMenuForm/AddMenuForm";
import MyCard from "../../myCard/MyCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function CafeDialog(props) {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
    props.onDialogClose();
  };

  const onDialogSubmit = (newDt) => {
    if(props.dataType === 'card'){
      const data = {name : newDt.name , data: newDt.data};
      props.onDialogSubmit(data);
    }else{
      const data = { id: props.menuData.id, data: newDt };
      props.onDialogSubmit(data);
    }
    
  };

  React.useEffect(() => {
    setOpen(props.openDialog);
  }, [props.openDialog]);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            {props.dataType !== "card" ? (
              <AddMenuForm
                onAddItem={onDialogSubmit}
                dataType={props.dataType}
                updateMode={props.menuData?.data}
              />
            ) : (
              <MyCard
              onAddItem={onDialogSubmit}
              orderData={props.menuData}
              />
            )}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
