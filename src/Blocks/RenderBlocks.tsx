import React, { Fragment } from 'react'

// Import your block components

import { MediaBlock } from '@/Blocks/MediaBlock/Component'
import NavigationBlock from './Navigation/NavigationRenderer'

type BlockType = 'mediaBlock' | 'navigation'

// Define the type for a block's data.
export interface BlockData {
  blockType: BlockType
  // Any additional properties the block may have.
  [key: string]: unknown
}

// Use our union type in the mapping.
const blockComponents: Record<BlockType, React.ComponentType<any>> = {
  mediaBlock: MediaBlock,
  navigation: NavigationBlock,
}

// Update the RenderBlocks prop type to use our BlockData array.
export const RenderBlocks: React.FC<{ blocks: BlockData[] }> = ({ blocks }) => {
  if (Array.isArray(blocks) && blocks.length > 0) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          // Ensure the blockType exists in our mapping.
          if (blockType && blockComponents[blockType]) {
            const Block = blockComponents[blockType]
            return (
              <div key={index}>
                <Block {...block} disableInnerContainer={true} />
              </div>
            )
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
