import { Story, Meta } from '@storybook/react/types-6-0'
import Galery, { GaleryProps } from '.'
import items from './mock'

export default {
  title: 'Galery',
  component: Galery,
  args: {
    items
  },
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story<GaleryProps> = (args) => (
  <div style={{ maxWidth: '130rem', margin: '0 auto' }}>
    <Galery {...args} />
  </div>
)
