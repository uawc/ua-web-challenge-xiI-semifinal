import React from "react";
import { compose, withState, withHandlers } from "recompose";

const startAnimation = ({ changeAnimationId }) => (callback) => {
	if (callback) callback();

	changeAnimationId(window.requestAnimationFrame(() => startAnimation({ changeAnimationId })(callback)));
};

export const withAnimation = compose(
  withState('animationId', 'changeAnimationId', undefined),
  withHandlers({
		startAnimation,
		stopAnimation({ animationId }) {
			if (animationId) window.cancelAnimationFrame(animationId);
		}
	})
)
