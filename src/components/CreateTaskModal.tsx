'use client';

import {
    Modal,
    TextInput,
    Button,
    Stack,
    Group,
    Select,
    Text,
} from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { type TaskFormData, type TaskStatus } from '~/types/task';
import 'dayjs/locale/zh-cn';

interface CreateTaskModalProps {
    opened: boolean;
    onClose: () => void;
    onSubmit: (data: TaskFormData) => void;
}

const statusOptions: { value: TaskStatus; label: string }[] = [
    { value: 'pending', label: '待处理' },
    { value: 'in-progress', label: '进行中' },
    { value: 'completed', label: '已完成' },
];

export function CreateTaskModal({ opened, onClose, onSubmit }: CreateTaskModalProps) {
    const form = useForm<TaskFormData>({
        initialValues: {
            name: '',
            dueDate: null,
            status: 'pending',
        },
        validate: {
            name: (value) => {
                if (!value.trim()) return '请输入任务名称';
                if (value.trim().length < 2) return '任务名称至少需要2个字符';
                if (value.trim().length > 100) return '任务名称不能超过100个字符';
                return null;
            },
        },
    });

    const handleSubmit = (values: TaskFormData) => {
        onSubmit(values);
        form.reset();
        onClose();
    };

    const handleClose = () => {
        form.reset();
        onClose();
    };

    return (
        <Modal
            opened={opened}
            onClose={handleClose}
            title={
                <Text fw={900} size="lg" tt="uppercase" style={{ letterSpacing: '-0.02em' }}>
                    创建新任务
                </Text>
            }
            size="md"
        >
            <form onSubmit={form.onSubmit(handleSubmit)}>
                <Stack gap="lg">
                    <TextInput
                        label="任务名称"
                        placeholder="输入任务名称..."
                        required
                        data-autofocus
                        {...form.getInputProps('name')}
                        styles={{
                            label: {
                                marginBottom: 8,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            },
                        }}
                    />

                    <DatePickerInput
                        label="截止日期"
                        placeholder="选择截止日期"
                        locale="zh-cn"
                        valueFormat="YYYY年MM月DD日"
                        clearable
                        minDate={new Date()}
                        {...form.getInputProps('dueDate')}
                        styles={{
                            label: {
                                marginBottom: 8,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            },
                        }}
                        popoverProps={{
                            withinPortal: true,
                            styles: {
                                dropdown: {
                                    backgroundColor: 'var(--mantine-color-dark-7)',
                                    border: '1px solid var(--mantine-color-dark-4)',
                                },
                            },
                        }}
                    />

                    <Select
                        label="状态"
                        placeholder="选择任务状态"
                        data={statusOptions}
                        {...form.getInputProps('status')}
                        styles={{
                            label: {
                                marginBottom: 8,
                                fontWeight: 600,
                                fontSize: '0.875rem',
                            },
                        }}
                    />

                    <Group justify="flex-end" mt="md">
                        <Button
                            variant="outline"
                            color="gray"
                            onClick={handleClose}
                        >
                            取消
                        </Button>
                        <Button
                            type="submit"
                            color="copper"
                            className="btn-3d"
                        >
                            创建任务
                        </Button>
                    </Group>
                </Stack>
            </form>
        </Modal>
    );
}
