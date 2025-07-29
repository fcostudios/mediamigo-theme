import type { Meta, StoryObj } from "@storybook/react";

function TailwindTest() {
    return (
        <div className="p-8 bg-neutral-100 min-h-screen">
            <div className="max-w-md mx-auto bg-white rounded-lg shadow-card p-6">
                <h1 className="text-2xl font-bold text-neutral-900 mb-4">Tailwind CSS Test</h1>
                <p className="text-neutral-900 mb-4">
                    This component tests if Tailwind CSS is working properly in Storybook.
                </p>
                <button className="w-full py-3 px-4 bg-primary hover:bg-primary-600 text-white rounded-lg font-medium">
                    Primary Button
                </button>
                <button className="w-full mt-2 py-3 px-4 bg-secondary hover:bg-blue-600 text-white rounded-lg font-medium">
                    Secondary Button
                </button>
                <button className="w-full mt-2 py-3 px-4 bg-accent hover:bg-red-600 text-white rounded-lg font-medium">
                    Accent Button
                </button>
            </div>
        </div>
    );
}

const meta = {
    title: "Test/Tailwind CSS",
    component: TailwindTest,
} satisfies Meta<typeof TailwindTest>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <TailwindTest />
};