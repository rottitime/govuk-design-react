import type { Meta, StoryObj } from '@storybook/react-vite'
import CharacterCount from './CharacterCount'

const meta: Meta<typeof CharacterCount> = {
  title: 'Atoms/CharacterCount',
  component: CharacterCount,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Help users know how much text they can enter when there is a limit on the number of characters. See https://design-system.service.gov.uk/components/character-count/ for more details.'
      }
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Can you provide more detail?',
    name: 'moreDetail',
    maxLength: 200
  }
}

export const WithHint: Story = {
  args: {
    label: 'Can you provide more detail?',
    name: 'moreDetail',
    maxLength: 200,
    hint: 'Do not include personal or financial information, like your National Insurance number or credit card details.'
  }
}

export const WordCount: Story = {
  args: {
    label: 'Enter a job description',
    name: 'jobDescription',
    maxWords: 150
  }
}

export const WithThreshold: Story = {
  args: {
    label: 'Can you provide more detail?',
    name: 'moreDetail',
    maxLength: 400,
    threshold: 75
  }
}
