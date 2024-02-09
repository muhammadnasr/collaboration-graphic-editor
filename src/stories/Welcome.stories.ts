import type { Meta, StoryObj } from "@storybook/react";
import Welcome from "../components/Welcome";

const meta = {
  title: "Welcome",
  component: Welcome,
} satisfies Meta<typeof Welcome>;

export default meta;

type Story = StoryObj<typeof Welcome>;

export const Default: Story = {};
