import {
	HiOutlineViewGrid,
	HiOutlineCube,
	HiOutlineShoppingCart,

} from 'react-icons/hi'

export const DASHBOARD_SIDEBAR_LINKS = [
	{
		key: 'dashboard',
		label: 'Dashboard',
		path: '/employee',
		icon: <HiOutlineViewGrid />
	},
	{
		key: 'createservice',
		label: 'Add Service',
		path: '/employee/addservice',
		icon: <HiOutlineCube />
	},
	{
		key: 'createsparepart',
		label: 'Add Spare Parts',
		path: '/employee/createsparepart',
		icon: <HiOutlineCube />
	},


]

