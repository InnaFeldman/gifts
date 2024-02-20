
import { Table, Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Pagination } from 'flowbite-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dialog from '../components/Dialog';


export default function GiftCards() {
    interface Card {
        id: number;
        balance: number;
        used_balance: number;
        expiry_date: string;
        user_name: string;
        user_email: string
    }

    interface FilterState {
        name?: string;
    }

    const [cards, setCards] = useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [openModal, setOpenModal] = useState(false);
    const [operationType, setOperationType] = useState('create');
    const [existingCardData, setExistingCardData] = useState(null);
    const [cardId, setCardId] =  useState(null);
    const [filters, setFilters] = useState<FilterState>({});


    useEffect(() => {
        // const queryParams = new URLSearchParams(filters).toString();
        getData();

    }, [filters]);

    function getData(queryParams?: string){
        let url = queryParams ? `http://127.0.0.1:8000/api/gift-cards?${queryParams}` : `http://127.0.0.1:8000/api/gift-cards`;

        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            setCards(data['data']);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }


    function onDeleteCars($id: number) {
        fetch(`http://127.0.0.1:8000/api/gift-cards/` + $id, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                setCards((prevCards) => prevCards.filter((card) => card.id !== $id));
                toast.success("Gift Card with id " + $id + " has been successfully removed.");
            })
            .catch(error => console.error(error));
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    function handleOpenModal(type: string, id: number | null) {
        setOperationType(type);
        setCardId(id);
        setExistingCardData(null);
        setOpenModal(true);
    }

    useEffect(() => {
        if (operationType === 'edit' && cardId !== null) {
            let card = cards.filter((card) => card.id === cardId);;
            setExistingCardData(card[0]);
        }else if(operationType === 'create'){
            setExistingCardData(null);
        }
    }, [openModal]);


    function handleSaveCard(data: any) {
        setCards((prevCards) => [...prevCards, data]);
        setOpenModal(false);
        setExistingCardData(null);
    };

    function onPageChange(page: number){
        setFilters((prevFilters) => ({
            ...prevFilters,
            page: page,
        }));
    }

    function handleFilterChange(event){
        const { name, value } = event.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    }

    function handleFilterSend(){
        const queryParams = new URLSearchParams(filters).toString();
        getData(queryParams);
    }



    return (
        <div className="mx-auto my-0 w-[85%]">
            <h1 className='mb-[5rem] mt-[3rem] text-center'>Gift Cards page</h1>

            <div className='filters mb-[2rem]'>
                <div className='flex'>
                    <TextInput onChange={handleFilterChange} name="name"  placeholder="Name" type="text" />
                    <TextInput onChange={handleFilterChange} name="email" placeholder="Email" type="text" />
                    <TextInput onChange={handleFilterChange} name="expiry_date" placeholder="Expiry Date" type="date" />
                    <Button color="success" onClick={handleFilterSend}>Filter</Button>
                </div>
                <Button color="success" onClick={() => handleOpenModal('create', null)}>Add New</Button>
                <Dialog show={openModal}
                    onClose={() => setOpenModal(false)}
                    onSaveCard={handleSaveCard}
                    existingCardData={existingCardData}
                    operation={operationType} />
                <ToastContainer />
            </div>

            <div className="overflow-x-auto">
                <Table >
                    <Table.Head>
                        <Table.HeadCell>ID</Table.HeadCell>
                        <Table.HeadCell>Balance</Table.HeadCell>
                        <Table.HeadCell>Expiry Date</Table.HeadCell>
                        <Table.HeadCell>User Name</Table.HeadCell>
                        <Table.HeadCell>User email</Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Edit</span>
                        </Table.HeadCell>
                        <Table.HeadCell>
                            <span className="sr-only">Delete</span>
                        </Table.HeadCell>
                    </Table.Head>
                    <Table.Body className="divide-y">
                        {cards.map((card) => (
                            <Table.Row key={card.id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">{card.id}</Table.Cell>
                                <Table.Cell>{card.balance}</Table.Cell>
                                <Table.Cell>{card.expiry_date}</Table.Cell>
                                <Table.Cell>{card.user_name}</Table.Cell>
                                <Table.Cell>{card.user_email}</Table.Cell>
                                <Table.Cell>
                                    <Button onClick={() => handleOpenModal('edit', card.id)}>Edit</Button>
                                </Table.Cell>
                                <Table.Cell>
                                    <Button color="failure" onClick={() => onDeleteCars(card.id)}>Delete</Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
                <Pagination currentPage={currentPage} totalPages={100} onPageChange={onPageChange} />
            </div>
        </div>
    );
}