import { useState } from 'react';
import {
    Plus,
    Pen,
    Trash2,
    ChevronDown,
    ChevronUp,
    Search,
    X,
    Folder,
    FolderOpen,
    Image
} from 'lucide-react';

const CategoriesPage = () => {
    // Sample categories data
    const [categories, setCategories] = useState([
        {
            id: 1,
            name: 'Bed',
            slug: 'bed',
            description: 'Luxury bedding and mattress accessories',
            image: 'https://images.unsplash.com/photo-1616627561839-074385245ff6',
            subcategories: [
                { id: 101, name: 'Sheets', slug: 'sheets' },
                { id: 102, name: 'Pillows', slug: 'pillows' },
                { id: 103, name: 'Duvets', slug: 'duvets' }
            ],
            expanded: false
        },
        {
            id: 2,
            name: 'Bath',
            slug: 'bath',
            description: 'Premium bath linens and accessories',
            image: 'https://images.unsplash.com/1600607688969-a5bfcd646154',
            subcategories: [
                { id: 201, name: 'Towels', slug: 'towels' },
                { id: 202, name: 'Robes', slug: 'robes' },
                { id: 203, name: 'Bath Mats', slug: 'bath-mats' }
            ],
            expanded: false
        },
        {
            id: 3,
            name: 'Living',
            slug: 'living',
            description: 'Stylish living room textiles',
            image: 'https://images.unsplash.com/1556905055-8f358a7a47b2',
            subcategories: [
                { id: 301, name: 'Throws', slug: 'throws' },
                { id: 302, name: 'Pillows', slug: 'pillows' },
                { id: 303, name: 'Blankets', slug: 'blankets' }
            ],
            expanded: false
        }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const [newCategory, setNewCategory] = useState({
        name: '',
        slug: '',
        description: '',
        image: ''
    });

    // Toggle category expansion
    const toggleExpand = (id) => {
        setCategories(categories.map(cat =>
            cat.id === id ? { ...cat, expanded: !cat.expanded } : cat
        ));
    };

    // Handle search
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        category.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle input changes for new category
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(prev => ({
            ...prev,
            [name]: value,
            slug: name === 'name' ? value.toLowerCase().replace(/\s+/g, '-') : prev.slug
        }));
    };

    // Add new category
    const handleAddCategory = (e) => {
        e.preventDefault();
        const newCat = {
            id: Math.max(...categories.map(c => c.id)) + 1,
            name: newCategory.name,
            slug: newCategory.slug,
            description: newCategory.description,
            image: newCategory.image || 'https://images.unsplash.com/1600607688969-a5bfcd646154',
            subcategories: [],
            expanded: false
        };
        setCategories([...categories, newCat]);
        setNewCategory({ name: '', slug: '', description: '', image: '' });
        setIsAddModalOpen(false);
    };

    // Delete category
    const handleDeleteCategory = () => {
        setCategories(categories.filter(cat => cat.id !== categoryToDelete));
        setIsDeleteModalOpen(false);
        setCategoryToDelete(null);
    };

    return (
        <div className="space-y-6">
            {/* Header with actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Categories</h1>
                    <p className="text-gray-500">Manage your product categories and subcategories</p>
                </div>
                <div className="flex items-center gap-3">
                    {/* Search */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm('')}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-4 w-4" />
                            </button>
                        )}
                    </div>

                    {/* Add Category Button */}
                    <button
                        onClick={() => setIsAddModalOpen(true)}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        <Plus className="h-5 w-5" />
                        <span className="hidden sm:inline">Add Category</span>
                    </button>
                </div>
            </div>

            {/* Categories Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Description
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Subcategories
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <>
                                        <tr key={category.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg overflow-hidden">
                                                        {category.image ? (
                                                            <img
                                                                src={category.image}
                                                                alt={category.name}
                                                                className="h-full w-full object-cover"
                                                            />
                                                        ) : (
                                                            <div className="h-full w-full flex items-center justify-center text-gray-400">
                                                                <Image className="h-5 w-5" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                                                        <div className="text-xs text-gray-500">/{category.slug}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">{category.description}</div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-900">
                                                    {category.subcategories.length} subcategories
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end space-x-3">
                                                    <button
                                                        onClick={() => toggleExpand(category.id)}
                                                        className="text-indigo-600 hover:text-indigo-900"
                                                    >
                                                        {category.expanded ? (
                                                            <ChevronUp className="h-5 w-5" />
                                                        ) : (
                                                            <ChevronDown className="h-5 w-5" />
                                                        )}
                                                    </button>
                                                    <button className="text-gray-500 hover:text-indigo-600">
                                                        <Pen className="h-5 w-5" />
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setCategoryToDelete(category.id);
                                                            setIsDeleteModalOpen(true);
                                                        }}
                                                        className="text-gray-500 hover:text-red-600"
                                                    >
                                                        <Trash2 className="h-5 w-5" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                        {category.expanded && (
                                            <tr className="bg-gray-50">
                                                <td colSpan="4" className="px-6 py-4">
                                                    <div className="pl-12">
                                                        <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center">
                                                            <FolderOpen className="h-4 w-4 mr-2 text-indigo-500" />
                                                            Subcategories
                                                        </h4>
                                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                            {category.subcategories.map((subcat) => (
                                                                <div key={subcat.id} className="bg-white p-3 rounded-lg border border-gray-200 shadow-xs flex items-center justify-between">
                                                                    <div>
                                                                        <div className="font-medium text-gray-900">{subcat.name}</div>
                                                                        <div className="text-xs text-gray-500">/{subcat.slug}</div>
                                                                    </div>
                                                                    <div className="flex space-x-2">
                                                                        <button className="text-gray-500 hover:text-indigo-600">
                                                                            <Pen className="h-4 w-4" />
                                                                        </button>
                                                                        <button className="text-gray-500 hover:text-red-600">
                                                                            <Trash2 className="h-4 w-4" />
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <button className="bg-gray-100 hover:bg-gray-200 p-3 rounded-lg border border-dashed border-gray-300 flex items-center justify-center text-gray-500 transition-colors">
                                                                <Plus className="h-4 w-4 mr-2" />
                                                                Add Subcategory
                                                            </button>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        )}
                                    </>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="px-6 py-12 text-center">
                                        <div className="text-gray-500">
                                            {searchTerm ? (
                                                <p>No categories found matching your search.</p>
                                            ) : (
                                                <p>No categories available. Create your first category!</p>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Add Category Modal */}
            {isAddModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setIsAddModalOpen(false)}></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <form onSubmit={handleAddCategory}>
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex items-start justify-between">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Add New Category</h3>
                                        <button
                                            type="button"
                                            className="text-gray-400 hover:text-gray-500"
                                            onClick={() => setIsAddModalOpen(false)}
                                        >
                                            <X className="h-6 w-6" />
                                        </button>
                                    </div>
                                    <div className="mt-4 space-y-4">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                                Category Name
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                id="name"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={newCategory.name}
                                                onChange={handleInputChange}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                                                URL Slug
                                            </label>
                                            <input
                                                type="text"
                                                name="slug"
                                                id="slug"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-50"
                                                value={newCategory.slug}
                                                onChange={handleInputChange}
                                                required
                                            />
                                            <p className="mt-1 text-xs text-gray-500">This will be used in the URL</p>
                                        </div>
                                        <div>
                                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                                Description
                                            </label>
                                            <textarea
                                                name="description"
                                                id="description"
                                                rows="3"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={newCategory.description}
                                                onChange={handleInputChange}
                                            ></textarea>
                                        </div>
                                        <div>
                                            <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                                                Image URL
                                            </label>
                                            <input
                                                type="url"
                                                name="image"
                                                id="image"
                                                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                                value={newCategory.image}
                                                onChange={handleInputChange}
                                                placeholder="https://example.com/image.jpg"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button
                                        type="submit"
                                        className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    >
                                        Add Category
                                    </button>
                                    <button
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                        onClick={() => setIsAddModalOpen(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {isDeleteModalOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                        <Trash2 className="h-6 w-6 text-red-600" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900">Delete Category</h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                Are you sure you want to delete this category? This action cannot be undone.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={handleDeleteCategory}
                                >
                                    Delete
                                </button>
                                <button
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                    onClick={() => setIsDeleteModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CategoriesPage;