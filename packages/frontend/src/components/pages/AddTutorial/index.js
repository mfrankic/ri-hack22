/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { memo, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { actions, selectors } from 'src/store';

const initialTutorialState = {};

const AddTutorial = ({
  addTutorial,
  clearTutorialSubmittedState,
  tutorials,
}) => {
  const [tutorial, setTutorial] = useState(initialTutorialState);

  const onChangeTitle = useCallback(
    (e) => {
      setTutorial({ ...tutorial, title: e.target.value });
    },
    [tutorial]
  );

  const onChangeDescription = useCallback(
    (e) => {
      setTutorial({ ...tutorial, description: e.target.value });
    },
    [tutorial]
  );

  const saveTutorial = useCallback(() => {
    const { title, description } = tutorial;
    console.log('🚀 ~ saveTutorial ~ title, description', title, description);

    addTutorial(title, description);
  }, [addTutorial, tutorial]);

  const newTutorial = useCallback(() => {
    setTutorial(initialTutorialState);
    clearTutorialSubmittedState();
  }, [clearTutorialSubmittedState]);

  return (
    <div className="submit-form">
      {tutorials?.submitted ? (
        <div>
          <h4>You submitted successfully!</h4>
          <button
            type="button"
            className="btn btn-success"
            onClick={newTutorial}
          >
            Add
          </button>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              required
              value={tutorial.title}
              onChange={onChangeTitle}
              name="title"
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              required
              value={tutorial.description}
              onChange={onChangeDescription}
              name="description"
            />
          </div>
          <button
            type="button"
            onClick={saveTutorial}
            className="btn btn-success"
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
};

AddTutorial.propTypes = {
  addTutorial: PropTypes.func.isRequired,
  clearTutorialSubmittedState: PropTypes.func.isRequired,
  tutorials: PropTypes.shape({
    submitted: PropTypes.bool,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  tutorials: selectors.tutorials.getTutorials(state),
});

const mapDispatchToProps = {
  ...actions.tutorials,
};

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  memo
)(AddTutorial);
