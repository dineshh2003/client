import { Menu, Transition } from "@headlessui/react"
import { Fragment } from "react"
import { MoreVertical, Ship, Eye } from 'lucide-react'

interface ActionMenuProps {
  onShipNow: () => void
  onViewDetails: () => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onShipNow, onViewDetails }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="text-blue-400 hover:text-blue-300 hover:bg-gray-800 p-2 rounded">
        <MoreVertical className="h-5 w-5" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-700" : ""
                } group flex w-full items-center px-4 py-2 text-gray-300`}
                onClick={onShipNow}
              >
                <Ship className="mr-2 h-5 w-5" /> Ship Now
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`${
                  active ? "bg-gray-700" : ""
                } group flex w-full items-center px-4 py-2 text-gray-300`}
                onClick={onViewDetails}
              >
                <Eye className="mr-2 h-5 w-5" /> View Details
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default ActionMenu

