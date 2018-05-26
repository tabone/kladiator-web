import React from 'react'
import { shallow } from 'enzyme'
import Textfield from '@material-ui/core/Textfield'
import ValidationTextField from './ValidationTextField'

describe('ValidationTextField Component', () => {
  describe('Blurring for the first time', () => {
    let onBlur = null
    let validation = null
    let onBlurEvent = null
    let textfieldValue = null

    beforeEach(() => {
      onBlurEvent = {}
      textfieldValue = 'textfield-value'

      onBlur = jest.fn()
      validation = jest.fn()

      const wrapper = shallow(<ValidationTextField onBlur={onBlur}
        value={textfieldValue}
        validation={validation}/>)

      wrapper.props().onBlur(onBlurEvent)
    })

    it('should invoke the onBlur prop', () => {
      const onBlurCalls = onBlur.mock.calls
      expect(onBlurCalls.length).toBe(1)
      expect(onBlurCalls[0][0]).toBe(onBlurEvent)
    })

    it('should validate the textfield value', () => {
      const validationCalls = validation.mock.calls
      expect(validationCalls.length).toBe(1)
      expect(validationCalls[0][0]).toBe(textfieldValue)
    })
  })

  describe('Blurring after the first blur', () => {
    let onBlur = null
    let validation = null
    let onBlurEvent = null

    beforeEach(() => {
      onBlurEvent = {}
      const textfieldValue = 'textfield-value'

      onBlur = jest.fn()
      validation = jest.fn()

      const wrapper = shallow(<ValidationTextField onBlur={onBlur}
        value={textfieldValue}
        validation={validation}/>)

      wrapper.props().onBlur()
      onBlur.mockClear()
      validation.mockClear()
      wrapper.props().onBlur(onBlurEvent)
    })

    it('should invoke the onBlur prop', () => {
      const onBlurCalls = onBlur.mock.calls
      expect(onBlurCalls.length).toBe(1)
      expect(onBlurCalls[0][0]).toBe(onBlurEvent)
    })

    it('should not validate the textfield value', () => {
      expect(validation.mock.calls.length).toBe(0)
    })
  })

  describe('Changing the value of the textfield before the first blur', () => {
    let onChange = null
    let validation = null
    let onChangeEvent = null

    beforeEach(() => {
      const textfieldValue = 'textfield-value'
      onChangeEvent = { target: { value: `${textfieldValue}-new` } }

      onChange = jest.fn()
      validation = jest.fn()

      const wrapper = shallow(<ValidationTextField onChange={onChange}
        value={textfieldValue}
        validation={validation} />)

      wrapper.props().onChange(onChangeEvent)
    })

    it('should invoke the onChange prop', () => {
      const onChangeCalls = onChange.mock.calls
      expect(onChangeCalls.length).toBe(1)
      expect(onChangeCalls[0][0]).toBe(onChangeEvent)
    })

    it('should not validate the new textfield value', () => {
      expect(validation.mock.calls.length).toBe(0)
    })
  })

  describe('Changing the value of the textfield after the first blur', () => {
    let onChange = null
    let validation = null
    let onChangeEvent = null

    beforeEach(() => {
      const textfieldValue = 'textfield-value'
      onChangeEvent = { target: { value: `${textfieldValue}-new` } }

      onChange = jest.fn()
      validation = jest.fn()

      const wrapper = shallow(<ValidationTextField onChange={onChange}
        value={textfieldValue}
        validation={validation} />)

      wrapper.props().onBlur()
      validation.mockClear()
      wrapper.props().onChange(onChangeEvent)
    })

    it('should invoke the onChange prop', () => {
      const onChangeCalls = onChange.mock.calls
      expect(onChangeCalls.length).toBe(1)
      expect(onChangeCalls[0][0]).toBe(onChangeEvent)
    })

    it('should validate the new textfield value', () => {
      const validationCalls = validation.mock.calls
      expect(validationCalls.length).toBe(1)
      expect(validationCalls[0][0]).toBe(onChangeEvent.target.value)
    })
  })

  describe('Invalidating a textfield value', () => {
    let wrapper = null
    let errorMessage = null
    let onValidityChange = null

    beforeEach(() => {
      errorMessage = 'error-message'
      const textfieldValue = 'textfield-value'
      const onChangeEvent = { target: { value: `${textfieldValue}-new` }}

      onValidityChange = jest.fn()
      const validation = jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(errorMessage)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      onValidityChange.mockClear()
      wrapper.update()
      wrapper.props().onChange(onChangeEvent)
      wrapper.update()
    })

    it('should display the error message', () => {
      expect(wrapper.props().helperText).toBe(errorMessage)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should invoke the onValidityChange prop indicating that the value has been invalidated', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(false)
    })
  })

  describe('Fixing an invalid textfield value', () => {
    let wrapper = null
    let errorMessage = null
    let onValidityChange = null

    beforeEach(() => {
      errorMessage = 'error-message'
      const textfieldValue = 'textfield-value'
      const onChangeEvent = { target: { value: `${textfieldValue}-new` }}

      onValidityChange = jest.fn()
      const validation = jest.fn()
        .mockReturnValueOnce(errorMessage)
        .mockReturnValueOnce(null)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      onValidityChange.mockClear()
      wrapper.update()
      wrapper.props().onChange(onChangeEvent)
      wrapper.update()
    })

    it('should remove the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should invoke the onValidityChange prop indicating that the value has been fixed', () => {
      const onValidityChangeCalls = onValidityChange.mock.calls
      expect(onValidityChangeCalls.length).toBe(1)
      expect(onValidityChangeCalls[0][0]).toBe(true)
    })
  })

  describe('Bluring for the first time on a textfield having a valid value', () => {
    let wrapper = null
    let onValidityChange = null

    beforeEach(() => {
      const textfieldValue = 'textfield-value'

      onValidityChange = jest.fn()
      const validation = jest.fn().mockReturnValueOnce(null)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      wrapper.update()
    })

    it('should not display the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should invoke the onValidityChange prop indicating that the value is valid', () => {
      const validationCalls = onValidityChange.mock.calls
      expect(validationCalls.length).toBe(1)
      expect(validationCalls[0][0]).toBe(true)
    })
  })

  describe('Changing a valid textfield value without invalidating it', () => {
    let wrapper = null
    let onValidityChange = null

    beforeEach(() => {
      const textfieldValue = 'textfield-value'
      const onChangeEvent = { target: { value: `${textfieldValue}-new` }}

      onValidityChange = jest.fn()
      const validation = jest.fn()
        .mockReturnValueOnce(null)
        .mockReturnValueOnce(null)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      onValidityChange.mockClear()
      wrapper.update()
      wrapper.props().onChange(onChangeEvent)
      wrapper.update()
    })

    it('should not display the error message', () => {
      expect(wrapper.props().helperText).toBe(null)
    })

    it('should not mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(false)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })

  describe('Changing an invalid textfield value without fixing it', () => {
    let wrapper = null
    let errorMessage = null
    let onValidityChange = null

    beforeEach(() => {
      errorMessage = 'error-message'
      const textfieldValue = 'textfield-value'
      const onChangeEvent = { target: { value: `${textfieldValue}-new` }}

      onValidityChange = jest.fn()
      const validation = jest.fn()
        .mockReturnValueOnce(errorMessage)
        .mockReturnValueOnce(errorMessage)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      onValidityChange.mockClear()
      wrapper.update()
      wrapper.props().onChange(onChangeEvent)
      wrapper.update()
    })

    it('should display the error message', () => {
      expect(wrapper.props().helperText).toBe(errorMessage)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })

  describe('Changing an invalid textfield value to fix the current problem but fail on another criteria', () => {
    let wrapper = null
    let errorMessage = null
    let onValidityChange = null

    beforeEach(() => {
      errorMessage = 'error-message'
      const textfieldValue = 'textfield-value'
      const onChangeEvent = { target: { value: `${textfieldValue}-new` }}

      onValidityChange = jest.fn()
      const validation = jest.fn()
        .mockReturnValueOnce(`${errorMessage}-first`)
        .mockReturnValueOnce(errorMessage)

      wrapper = shallow(<ValidationTextField value={textfieldValue}
        validation={validation}
        onValidityChange={onValidityChange} />)

      wrapper.props().onBlur()
      onValidityChange.mockClear()
      wrapper.update()
      wrapper.props().onChange(onChangeEvent)
      wrapper.update()
    })

    it('should display the last error message', () => {
      expect(wrapper.props().helperText).toBe(errorMessage)
    })

    it('should mark the textfield as invalid', () => {
      expect(wrapper.props().error).toBe(true)
    })

    it('should not invoke the onValidityChange prop', () => {
      expect(onValidityChange.mock.calls.length).toBe(0)
    })
  })
})
