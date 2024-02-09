import type { Meta, StoryObj } from "@storybook/react";
import Editor from "../components/Editor";

const meta = {
  title: "Editor",
  component: Editor,
} satisfies Meta<typeof Editor>;

export default meta;

type Story = StoryObj<typeof Editor>;

export const Default: Story = {};
