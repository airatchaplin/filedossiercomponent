import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Segment, Button, Icon } from 'semantic-ui-react';
import UploadForm from '../UploadForm';

function DossierActions({ dossierFile, actionsState, dossierActions, readOnly }) {
  const [uploadOpened, setUploadOpen] = useState(null);
  if (dossierFile.readonly || readOnly) {
    return <div />;
  }

  const closeUploadModal = () => {
    setUploadOpen(false);
    document.onclick = null;
  };

  const openUploadModal = (event) => {
    setUploadOpen(true);

    /* hide modal on click outside */
    const modal = event.currentTarget.parentNode.querySelector('.segment');
    document.onclick = (e) => {
      if (!modal.contains(e.target)) {
        closeUploadModal();
      }
    };
  };

  return (
    <div>
      <Button
        size="small"
        positive
        content="Загрузить"
        disabled={uploadOpened}
        onClick={openUploadModal}
        id={`fdUploudModalBtn_${dossierFile.code}`}
      />
      {/* <Button negative size="small"
        content="Удалить"
        // onClick={remove}
      /> */}
      <Segment
        style={{
          position: 'absolute',
          top: -20,
          right: '-8px',
          whiteSpace: 'nowrap',
          zIndex: 1000,
          display: uploadOpened ? '' : 'none'
        }}>
        {uploadOpened && (
          <div>
            <UploadForm
              file={dossierFile}
              actionsState={actionsState}
              dossierActions={dossierActions}
              uploadCallback={({ error }) => {
                if (!error) {
                  closeUploadModal();
                }
              }}
            />
            <Icon
              link
              name="close"
              onClick={closeUploadModal}
              style={{ position: 'absolute', top: 0, right: 0 }}
            />
          </div>
        )}
      </Segment>
    </div>
  );
}

DossierActions.propTypes = {
  dossierFile: PropTypes.object.isRequired,
  actionsState: PropTypes.object.isRequired,
  dossierActions: PropTypes.object.isRequired,
  readOnly: PropTypes.bool
};

export default DossierActions;
