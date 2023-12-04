import React, { useState, Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import "../product.css";
import cartImg from "../images/pexels-karolina-grabowska-5632382.jpg";

import {
  fetchFilteredProductsAsync,
  selectProduct,
  selectTotalItems,
  selectCategories,
  selectBrands,
  fetchCategoriesAsync,
  fetchBrandsAsync,
} from "../productSlice";

import { Dialog, Disclosure, Menu, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  MinusIcon,
  PlusIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

let sortOptions = [
  {
    name: "Best Rating",
    sortName: "rating",
    sortOrder: "desc",
    current: false,
  },

  {
    name: "Price: Low to High",
    sortName: "price",
    sortOrder: "asc",
    current: false,
  },
  {
    name: "Price: High to Low",
    sortName: "price",
    sortOrder: "desc",
    current: false,
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function ProductList() {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState({});
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ _page: page, _limit: 10 });
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const products = useSelector(selectProduct);
  const categories = useSelector(selectCategories);
  const brands = useSelector(selectBrands);
  let totalItems = useSelector(selectTotalItems);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCategoriesAsync());
    dispatch(fetchBrandsAsync());
  }, []);

  useEffect(() => {
    dispatch(fetchFilteredProductsAsync({ filter, sort, pagination }));
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ _page: page, _limit: 10 });
  }, [page]);

  useEffect(() => {
    setPage(1);
  }, [filter, sort]);

  const filters = [
    {
      id: "category",
      name: "Category",
      options: categories,
    },
    {
      id: "brand",
      name: "Brand",
      options: brands,
    },
  ];

  const handleFilter = (e, section, option) => {
    let filterObj = { ...filter };

    if (e.target.checked) {
      if (filterObj[section.id]) {
        filterObj[section.id].push(option.value);
      } else {
        filterObj[section.id] = [option.value];
      }

      setFilter({ ...filterObj });
    } else {
      const index = filterObj[section.id].findIndex((e) => e === option.value);
      filterObj[section.id].splice(index, 1);

      setFilter({ ...filterObj });
    }
  };

  const handleSort = (option) => {
    sortOptions = sortOptions.map((e) => {
      if (e.name === option.name) {
        return { ...e, current: true };
      } else {
        return { ...e, current: false };
      }
    });

    let sortBy = {
      _sort: option.sortName,
      _order: option.sortOrder,
    };

    setSort(sortBy);
  };

  const handlePagination = ({ paginationButton }) => {
    if (typeof paginationButton === "string") {
      if (paginationButton === "next") {
        console.log(Math.ceil(totalItems / 10));
        if (page < Math.ceil(totalItems / 10)) {
          setPage(page + 1);
        }
      } else {
        if (page > 1) {
          setPage(page - 1);
        }
      }
    } else {
      const pageNumb = parseInt(paginationButton?.target?.innerHTML);
      if (pageNumb <= Math.ceil(totalItems / 10)) {
        setPage(pageNumb);
      }
    }

    // setPagination({ _page: page, _limit: 10 });
  };

  return (
    <div>
      <div className="intro">
        <div className="welcome">
          <div className="welcomeText">
            <h1>
              <span>Super</span>Cart
            </h1>
          </div>
          <div className="welcomePhoto">
            <img className="item1" src={cartImg} alt="introPhoto"></img>
          </div>
        </div>
      </div>
      <div className=" p-5" style={{ backgroundColor: "#f4ebe0" }}>
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                  as={Fragment}
                  enter="transition ease-in-out duration-300 transform"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transition ease-in-out duration-300 transform"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel
                    className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto  py-4 pb-12 shadow-xl"
                    style={{ backgroundColor: "#f4ebe0" }}
                  >
                    <div className="flex items-center justify-between px-4">
                      <h2 className="text-lg font-medium text-gray-900">
                        Filters
                      </h2>
                      <button
                        type="button"
                        className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-gray-400"
                        style={{ backgroundColor: "#f4ebe0" }}
                        onClick={() => setMobileFiltersOpen(false)}
                      >
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    <form className="mt-4 border-t border-gray-200">
                      <h3 className="sr-only">Categories</h3>

                      {filters.map((section) => (
                        <Disclosure
                          as="div"
                          key={section.id}
                          className="border-t border-gray-200 px-4 py-6"
                        >
                          {({ open }) => (
                            <>
                              <h3 className="-mx-2 -my-3 flow-root">
                                <Disclosure.Button
                                  className="flex w-full items-center justify-between  px-2 py-3 text-gray-400 hover:text-gray-500"
                                  style={{ backgroundColor: "#f4ebe0" }}
                                >
                                  <span className="font-medium text-gray-900">
                                    {section.name}
                                  </span>
                                  <span className="ml-6 flex items-center">
                                    {open ? (
                                      <MinusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    ) : (
                                      <PlusIcon
                                        className="h-5 w-5"
                                        aria-hidden="true"
                                      />
                                    )}
                                  </span>
                                </Disclosure.Button>
                              </h3>
                              <Disclosure.Panel className="pt-6">
                                <div className="space-y-6">
                                  {section.options.map((option, optionIdx) => (
                                    <div
                                      key={option.value}
                                      className="flex items-center"
                                    >
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="checkbox"
                                        defaultChecked={option.checked}
                                        onChange={(e) => {
                                          handleFilter(e, section, option);
                                        }}
                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 min-w-0 flex-1 text-gray-500"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                              </Disclosure.Panel>
                            </>
                          )}
                        </Disclosure>
                      ))}
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition.Root>

          <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                Products for you
              </h1>

              <div className="flex items-center ">
                <Menu
                  as="div"
                  className="relative inline-block text-left  lg:hidden"
                >
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Sort
                      <ChevronDownIcon
                        className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items
                      className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                      style={{ backgroundColor: "#f4ebe0" }}
                    >
                      <div className="py-1">
                        {sortOptions.map((option) => (
                          <Menu.Item
                            key={option.name}
                            onClick={() => {
                              handleSort(option);
                            }}
                          >
                            {({ active }) => (
                              <a
                                href={option.href}
                                className={classNames(
                                  option.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm"
                                )}
                              >
                                {option.name}
                              </a>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                {/* <button
                  type="button"
                  className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                >
                  <span className="sr-only">View grid</span>
                  <Squares2X2Icon className="h-5 w-5" aria-hidden="true" />
                </button> */}
                <button
                  type="button"
                  className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Filters</span>
                  <FunnelIcon className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pb-24 pt-6">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                {/* Filters */}
                <form className="hidden lg:block">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                        Sort
                        <ChevronDownIcon
                          className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 left-14 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none"
                        style={{ backgroundColor: "#f4ebe0" }}
                      >
                        <div className="py-1">
                          {sortOptions.map((option) => (
                            <Menu.Item
                              key={option.name}
                              onClick={() => {
                                handleSort(option);
                              }}
                            >
                              {({ active }) => (
                                <a
                                  href={option.href}
                                  className={classNames(
                                    option.current
                                      ? "font-medium text-gray-900"
                                      : "text-gray-500",
                                    active ? "bg-gray-100" : "",
                                    "block px-4 py-2 text-sm"
                                  )}
                                >
                                  {option.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <h3 className="sr-only">Categories</h3>

                  {filters.map((section) => (
                    <Disclosure
                      as="div"
                      key={section.id}
                      className="border-b border-gray-200 py-6"
                    >
                      {({ open }) => (
                        <>
                          <h3 className="-my-3 flow-root">
                            <Disclosure.Button
                              className="flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500"
                              style={{ backgroundColor: "#f4ebe0" }}
                            >
                              <span className="font-medium text-gray-900">
                                {section.name}
                              </span>
                              <span className="ml-6 flex items-center">
                                {open ? (
                                  <MinusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                ) : (
                                  <PlusIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                )}
                              </span>
                            </Disclosure.Button>
                          </h3>
                          <Disclosure.Panel className="pt-6">
                            <div className="space-y-4">
                              {section.options.map((option, optionIdx) => (
                                <div
                                  key={option.value}
                                  className="flex items-center"
                                >
                                  <input
                                    id={`filter-${section.id}-${optionIdx}`}
                                    name={`${section.id}[]`}
                                    defaultValue={option.value}
                                    onChange={(e) => {
                                      handleFilter(e, section, option);
                                    }}
                                    type="checkbox"
                                    defaultChecked={option.checked}
                                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  />
                                  <label
                                    htmlFor={`filter-${section.id}-${optionIdx}`}
                                    className="ml-3 text-sm text-gray-600"
                                  >
                                    {option.label}
                                  </label>
                                </div>
                              ))}
                            </div>
                          </Disclosure.Panel>
                        </>
                      )}
                    </Disclosure>
                  ))}
                </form>

                {/* Product grid */}
                <div className="lg:col-span-3">
                  {" "}
                  <div style={{ backgroundColor: "#f4ebe0" }}>
                    <div className="mx-auto max-w-2xl px-4 py-0 sm:px-6 sm:py-0 lg:max-w-7xl lg:px-8">
                      <h2 className="sr-only">Products</h2>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                        {products.map((product) => (
                          <Link to={`/productdetail/${product.id}`}>
                            <div
                              key={product.id}
                              href={product.thumbnail}
                              className="group"
                            >
                              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                                <img
                                  src={product.thumbnail}
                                  alt={product.title}
                                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                                />
                              </div>
                              <div className="mt-4 flex justify-between">
                                <div>
                                  <h3 className="text-sm text-gray-700">
                                    {product.title}
                                  </h3>

                                  <div className="flex items-center text-gray-500 mt-2">
                                    <StarIcon className="w-6 h-6 mr-1 "></StarIcon>

                                    <p className="mt-1 text-sm text-gray-500">
                                      {product.rating}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">
                                    $
                                    {Math.round(
                                      product.price - (10 / 100) * product.price
                                    )}
                                  </p>
                                  <p className="text-sm font-medium text-gray-500 line-through">
                                    ${product.price}
                                  </p>
                                </div>
                              </div>

                              {/* <div className="mt-4 flex justify-between">
                                <div>
                                  {" "}
                                  <h3 className="mt-4 text-sm text-gray-700">
                                    {product.title}
                                  </h3>
                                  <div className="flex items-center">
                                    <StarIcon className="w-6 h-6"></StarIcon>

                                    <p className="mt-1 text-lg font-medium text-gray-900">
                                      {product.rating}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  {" "}
                                  <p className="mt-1 text-lg font-medium text-gray-900">
                                    {product.price}
                                  </p>
                                  <p className="mt-1 text-lg font-medium text-gray-900">
                                    {product.price}
                                  </p>
                                </div>
                              </div> */}
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* pagination */}

            <div
              className="flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6"
              style={{ backgroundColor: "#f4ebe0" }}
            >
              <div className="flex flex-1 justify-between sm:hidden">
                <p
                  href="#"
                  style={{ backgroundColor: "#f4ebe0" }}
                  className="relative inline-flex items-center rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    const paginationButton = "previous";

                    handlePagination({ paginationButton });
                  }}
                >
                  Previous
                </p>
                <p
                  href="#"
                  style={{ backgroundColor: "#f4ebe0" }}
                  className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  onClick={(e) => {
                    const paginationButton = "next";

                    handlePagination({ paginationButton });
                  }}
                >
                  Next
                </p>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{page * 10 - 9}</span>{" "}
                    to{" "}
                    <span className="font-medium">
                      {page * 10 > totalItems ? totalItems : page * 10}
                    </span>{" "}
                    of <span className="font-medium">{totalItems}</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                    aria-label="Pagination"
                  >
                    <p
                      href="#"
                      className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Previous</span>
                      <ChevronLeftIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={(e) => {
                          const paginationButton = "previous";

                          handlePagination({ paginationButton });
                        }}
                      />
                    </p>
                    {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
                    <p
                      href="#"
                      aria-current="page"
                      className={`cursor-pointer relative z-10 inline-flex items-center ${
                        page === 1
                          ? "bg-indigo-600 focus-visible:outline-indigo-600 text-white"
                          : "bg-none"
                      }  px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 `}
                      onClick={(e) => {
                        const paginationButton = e;
                        handlePagination({ paginationButton });
                      }}
                    >
                      1
                    </p>
                    <p
                      href="#"
                      className={` ${
                        page === 2
                          ? "bg-indigo-600 focus-visible:outline-indigo-600 text-white"
                          : "bg-none"
                      } cursor-pointer relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300  focus:z-20 focus:outline-offset-0`}
                      onClick={(e) => {
                        const paginationButton = e;
                        handlePagination({ paginationButton });
                      }}
                    >
                      2
                    </p>

                    <p
                      href="#"
                      className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                    >
                      <span className="sr-only">Next</span>
                      <ChevronRightIcon
                        className="h-5 w-5"
                        aria-hidden="true"
                        onClick={(e) => {
                          const paginationButton = "next";

                          handlePagination({ paginationButton });
                        }}
                      />
                    </p>
                  </nav>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
