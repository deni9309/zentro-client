'use client'

import { useState } from 'react'
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

import CreateProductModal from '@/components/create-product-modal'
import { set } from 'zod'

export default function CreateProductFloatingBtn() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <CreateProductModal
        open={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
      />
      <div className="absolute bottom-10 left-10">
        <Fab color="secondary" onClick={() => setIsModalOpen(true)}>
          <AddIcon />
        </Fab>
      </div>
    </>
  )
}
