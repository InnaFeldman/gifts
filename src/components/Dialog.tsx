import { Button, Checkbox, Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface DialogProps {
    show: boolean;
    onClose: () => void;
    onSaveCard: (data: any) => void;
    operation: string;
    existingCardData?: any
}

export default function Dialog({ show, onClose, onSaveCard, operation, existingCardData }: DialogProps) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        balance: '',
        expiry_date: Date()
    });

    const [title, setTitle] = useState('Create new Gift Card For User');

    useEffect(() => {
        if (existingCardData) {
            setFormData({
                name: existingCardData[0].user_name,
                email: existingCardData[0].user_email,
                password: '',
                balance: existingCardData[0].balance,
                expiry_date: existingCardData[0].expiry_date
            });

            setTitle('Edit Card');
        }
    }, [existingCardData]);


    function onCloseModal() {
        onClose();
    }

    function handleInputChange(event: { target: { id: any; value: any; }; }) {
        const { id, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    }

    function handleSubmit(event: { preventDefault: () => void; }) {
        event.preventDefault();
        // const apiEndpoint = operation === 'edit'
        //     ? `http://127.0.0.1:8000/api/gift-cards/${formData.id}`
        //     : 'http://127.0.0.1:8000/api/gift-cards/add';

        // const httpMethod = operation === 'edit' ? 'put' : 'post';

        // axios({
        //     method: httpMethod,
        //     url: apiEndpoint,
        //     data: formData,
        // })
        //     .then(res => {
        //         console.log(res);
        //         onSaveCard(res.data);
        //         onCloseModal();
        //     })
        //     .catch(err => console.log(err));
    }

    return (
        <>
            <Modal show={show} size="md" onClose={onCloseModal} popup>
                <Modal.Header />
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{title}</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="name" value="Your name *" />
                            </div>
                            <TextInput
                                id="name"
                                placeholder="Name"
                                type="text"
                                value={formData.name}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value="Your email *" />
                            </div>
                            <TextInput
                                id="email"
                                placeholder="name@company.com"
                                type='text'
                                value={formData.email}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value="Your password *" />
                            </div>
                            <TextInput
                                id="password"
                                type="password"
                                value={formData.password}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="balance" value="Balance *" />
                            </div>
                            <TextInput
                                id="balance"
                                type="number"
                                value={formData.balance}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="expiry_date" value="Expiry Date *" />
                            </div>
                            <TextInput
                                id="expiry_date"
                                type="date"
                                value={formData.expiry_date}
                                required
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="w-full">
                            <Button type='submit'>Save</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </>
    );
}
