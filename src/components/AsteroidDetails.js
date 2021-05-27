import React from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal, selectIsOpenedModal } from "../features/modalSlice";
import styled from "styled-components";
import { selectCurrentAsteroid } from "../features/asteroidSlice";
import CloseIcon from "@material-ui/icons/Close";

Modal.setAppElement("#root");

const modalStyle = {
  content: {
    width: "60%",
    maxWidth: "620px",
    height: "70%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: `translate(-50%, -50%)`,
    backgroundColor: "white",
    borderRadius: "10px",
    border: 0,
    padding: 0,
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.2)",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, 0.5)`,
  },
};

const AsteroidDetails = () => {
  const isOpenedModal = useSelector(selectIsOpenedModal);
  const currentOpenedAsteroid = useSelector(selectCurrentAsteroid);
  console.log(currentOpenedAsteroid);
  const dispatch = useDispatch();

  const handleModalRequestClose = () => {
    dispatch(closeModal());
    document.body.style.overflow = "unset";
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
    document.body.style.overflow = "unset";
  };

  return (
    <Modal
      isOpen={isOpenedModal}
      onRequestClose={handleModalRequestClose}
      contentLabel="Asteroid Details"
      preventScroll={true}
      style={{ content: modalStyle.content, overlay: modalStyle.overlay }}
    >
      {currentOpenedAsteroid && (
        <ModalContent>
          <AsteroidImage src="/assets/images/asteroids_card_bg.png" />
          <CloseIcon onClick={handleCloseModal} />
          <AsteroidMagnitude>
            {parseFloat(currentOpenedAsteroid.absolute_magnitude).toFixed(1)}
          </AsteroidMagnitude>
          <AsteroidInfo>
            <Top>
              <AsteroidName>{currentOpenedAsteroid.name}</AsteroidName>
              <AsteroidDiameter>
                Estimated diameter:{" "}
                <span>
                  {parseFloat(
                    currentOpenedAsteroid.est_diameter.estimated_diameter_min
                  ).toFixed(5) + " - "}
                  {parseFloat(
                    currentOpenedAsteroid.est_diameter.estimated_diameter_max
                  ).toFixed(5) + " km"}
                </span>
              </AsteroidDiameter>
              <ApproachDate>
                Approach date:{" "}
                <span>{currentOpenedAsteroid.close_approach_date}</span>
              </ApproachDate>
              <MissDistance>
                Miss distance:{" "}
                <span>
                  {parseFloat(currentOpenedAsteroid.miss_distance).toFixed(2) +
                    " km"}
                </span>
              </MissDistance>
            </Top>
            <Bottom>
              <VelocityContainer>
                <VelocityIcon src="/assets/images/velocity-icon.svg" />
                <Velocity>
                  Velocity:{" "}
                  {parseFloat(currentOpenedAsteroid.relative_velocity).toFixed(
                    2
                  )}{" "}
                  km/s
                </Velocity>
              </VelocityContainer>
              <OrbitingBody>
                <BodyImage src="/assets/images/earth-orbit.png" />
                <BodyName>
                  Orbiting body ({currentOpenedAsteroid.orbiting_body})
                </BodyName>
              </OrbitingBody>
            </Bottom>
          </AsteroidInfo>
        </ModalContent>
      )}
    </Modal>
  );
};

export default AsteroidDetails;

const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;

  .MuiSvgIcon-root {
    color: white;
    position: absolute;
    top: 20px;
    left: 20px;
    font-size: 2rem;
    cursor: pointer;
  }
`;

const AsteroidImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const AsteroidMagnitude = styled.div`
  border-radius: 50%;
  background-color: white;
  position: absolute;
  top: 20px;
  right: 20px;
  padding: 18px 14px;
  color: var(--light-purple);
  font-size: 16px;
  font-weight: 500;
`;

const AsteroidInfo = styled.div`
  padding: 22px;
  display: flex;
  flex-direction: column;
`;

const Top = styled.div``;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const AsteroidName = styled.p`
  font-size: 17px;
  font-weight: 500;
  margin-bottom: 12px;
  color: var(--dark-purple);
`;

const AsteroidDiameter = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: var(--dark-purple);
  margin-bottom: 5px;

  span {
    color: var(--light-purple);
    font-weight: 400;
    font-size: 14px;
  }
`;

const ApproachDate = styled(AsteroidDiameter)`
  span {
    color: var(--light-purple);
    font-weight: 400;
  }
`;

const MissDistance = styled(AsteroidDiameter)`
  span {
    color: var(--light-purple);
    font-weight: 400;
  }
`;

const VelocityContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 28px;
`;

const Velocity = styled.div`
  font-size: 15px;
  font-weight: 400;
  color: var(--dark-purple);
`;

const VelocityIcon = styled.img`
  width: 50px;
  height: 50px;
  object-fit: contain;
  margin-right: 12px;
`;

const OrbitingBody = styled.div`
  position: absolute;
  right: 3vw;
  bottom: 1vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BodyImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-bottom: 6px;
`;

const BodyName = styled(Velocity)``;
