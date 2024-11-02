import { useState, useEffect, useRef } from 'react';

// ThreeDObject.js class definition
class ThreeDeeObject {
    constructor(initialState = {}) {
      this._position = initialState.position || { x: 0, y: 0, z: 0 };
      this._rotation = initialState.rotation || { x: 0, y: 0, z: 0 };
      this._updateCallback = () => {};
    }
  
    // Register state update callback
    setUpdateCallback(callback) {
      this._updateCallback = callback;
    }
  
    // Position methods
    getPosition() {
      return { ...this._position };
    }
  
    setPosition(newPosition) {
      this._position = { ...this._position, ...newPosition };
      this._updateCallback(this.getState());
    }
  
    // Rotation methods
    getRotation() {
      return { ...this._rotation };
    }
  
    setRotation(newRotation) {
      this._rotation = { ...this._rotation, ...newRotation };
      this._updateCallback(this.getState());
    }
  
    // Get full state
    getState() {
      return {
        position: this.getPosition(),
        rotation: this.getRotation()
      };
    }
  }
  
  // Custom hook for using ThreeDObject with React state
  const useThreeDeeObject = (initialState = {}) => {
    const [objectState, setObjectState] = useState(initialState);
    const objectRef = useRef(null);
  
    useEffect(() => {
      // Create new instance if it doesn't exist
      if (!objectRef.current) {
        objectRef.current = new ThreeDeeObject(initialState);
        objectRef.current.setUpdateCallback(setObjectState);
      }
    }, []);
  
    return objectRef.current;
  };
  
  export { ThreeDeeObject, useThreeDeeObject };