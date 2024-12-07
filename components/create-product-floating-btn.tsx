'use client'

import { useState } from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import CreateProductModal from '@/components/create-product-modal'

export default function CreateProductFloatingBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <CreateProductModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />

      <div className="fixed bottom-10 left-10 z-20">
        <Fab color="secondary" onClick={() => setIsModalOpen(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
