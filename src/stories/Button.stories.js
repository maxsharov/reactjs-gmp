import Button from "../components/UI/Button";

export default {
  title: "Components/UI/Button",
  component: Button,
  // argTypes: onClick
}

const Template = ({ children, ...args }) => <Button {...args}>{children}</Button>

export const ResetButton = Template.bind({})
ResetButton.args = {
  children: 'Reset',
  reset: true,
}

export const SubmitButton = Template.bind({})
SubmitButton.args = {
  children: 'Submit',
  primary: true,
  submit: true,
}

export const OutlinedButton = Template.bind({})
OutlinedButton.args = {
  children: 'Submit',
  primary: true,
  outlined: true,
}
