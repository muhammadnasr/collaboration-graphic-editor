import type { Meta, StoryObj } from "@storybook/react";
import EditorApp from "../components/EditorApp";

const meta = {
  title: "Editor",
  component: EditorApp,
} satisfies Meta<typeof EditorApp>;

export default meta;

type Story = StoryObj<typeof EditorApp>;

export const Default: Story = {};
