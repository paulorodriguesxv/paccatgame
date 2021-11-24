import React from 'react'
import { Modal } from 'react-bootstrap'
import Loader from 'react-loader-spinner';
import { TwitterShareButton, TwitterIcon } from "react-share";

const StatusForm = (props) => {
    const  { show, setPaying, message } = props
  
    return (
      <>
        <Modal
          show={show}
          onHide={() => setPaying("")}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Player subscription
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
             {message}
            </p>
            <div className="container" style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                <Loader visible={props.loading} type="Grid" color="#00004d" height={40} width={40}/>
            </div>
            <div className="text-center pt-5">
              <TwitterShareButton
                        title="Hi! I just enrolled to play at PacCat Game #paccatgame"
                      url="https://paccatgame.com/"
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>    
            </div>            
          </Modal.Body>
        </Modal>
      </>
    );
  }

export default StatusForm