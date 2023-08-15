import { Meta, StoryObj } from '@storybook/react';

import { Code } from './Code';

const meta = {
    title: 'Code',
    component: Code,
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Normal: Story = {
    args: {
        text: `<!DOCTYPE html>
        <html>
          <body>
            <p id="hello"></p>
        
            <script>
              document.getElementById("hello").innerHTML = "Hello, world!";
            </script>
          </body>
        </html>;`,
    },
};
