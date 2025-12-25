'use client';

import { useState, useEffect, useCallback } from 'react';
import { type Task, type TaskFormData, type TaskStatus } from '~/types/task';

const STORAGE_KEY = 'copper-tasks';

// 生成唯一ID
const generateId = (): string => {
    return `task_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// 安全地将日期转换为 ISO 字符串
const toISOStringOrNull = (date: Date | string | null | undefined): string | null => {
    if (!date) return null;
    if (typeof date === 'string') {
        // 已经是字符串，验证是否为有效日期
        const parsed = new Date(date);
        return isNaN(parsed.getTime()) ? null : parsed.toISOString();
    }
    if (date instanceof Date) {
        return isNaN(date.getTime()) ? null : date.toISOString();
    }
    return null;
};

// 从 localStorage 读取数据
const getStoredTasks = (): Task[] => {
    if (typeof window === 'undefined') return [];

    try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            return JSON.parse(stored) as Task[];
        }
    } catch (error) {
        console.error('Error reading from localStorage:', error);
    }
    return [];
};

// 保存数据到 localStorage
const setStoredTasks = (tasks: Task[]): void => {
    if (typeof window === 'undefined') return;

    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Error writing to localStorage:', error);
    }
};

export function useLocalStorage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // 初始化时从 localStorage 加载数据
    useEffect(() => {
        const storedTasks = getStoredTasks();
        setTasks(storedTasks);
        setIsLoaded(true);
    }, []);

    // 添加任务
    const addTask = useCallback((formData: TaskFormData): Task => {
        const newTask: Task = {
            id: generateId(),
            name: formData.name.trim(),
            dueDate: toISOStringOrNull(formData.dueDate),
            status: formData.status || 'pending',
            createdAt: new Date().toISOString(),
        };

        setTasks((prevTasks) => {
            const updatedTasks = [...prevTasks, newTask];
            setStoredTasks(updatedTasks);
            return updatedTasks;
        });

        return newTask;
    }, []);

    // 更新任务
    const updateTask = useCallback((taskId: string, updates: Partial<TaskFormData>): Task | null => {
        let updatedTask: Task | null = null;

        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === taskId) {
                    updatedTask = {
                        ...task,
                        name: updates.name !== undefined ? updates.name.trim() : task.name,
                        dueDate: updates.dueDate !== undefined
                            ? toISOStringOrNull(updates.dueDate)
                            : task.dueDate,
                        status: updates.status !== undefined ? updates.status : task.status,
                    };
                    return updatedTask;
                }
                return task;
            });
            setStoredTasks(updatedTasks);
            return updatedTasks;
        });

        return updatedTask;
    }, []);

    // 删除任务
    const deleteTask = useCallback((taskId: string): boolean => {
        let deleted = false;

        setTasks((prevTasks) => {
            const taskExists = prevTasks.some((task) => task.id === taskId);
            if (!taskExists) return prevTasks;

            deleted = true;
            const updatedTasks = prevTasks.filter((task) => task.id !== taskId);
            setStoredTasks(updatedTasks);
            return updatedTasks;
        });

        return deleted;
    }, []);

    // 更新任务状态
    const updateTaskStatus = useCallback((taskId: string, status: TaskStatus): Task | null => {
        let updatedTask: Task | null = null;

        setTasks((prevTasks) => {
            const updatedTasks = prevTasks.map((task) => {
                if (task.id === taskId) {
                    updatedTask = { ...task, status };
                    return updatedTask;
                }
                return task;
            });
            setStoredTasks(updatedTasks);
            return updatedTasks;
        });

        return updatedTask;
    }, []);

    // 清空所有任务
    const clearAllTasks = useCallback((): void => {
        setTasks([]);
        setStoredTasks([]);
    }, []);

    // 获取任务统计
    const getTaskStats = useCallback(() => {
        const total = tasks.length;
        const pending = tasks.filter((t) => t.status === 'pending').length;
        const inProgress = tasks.filter((t) => t.status === 'in-progress').length;
        const completed = tasks.filter((t) => t.status === 'completed').length;

        // 计算逾期任务
        const now = new Date();
        const overdue = tasks.filter((t) => {
            if (!t.dueDate || t.status === 'completed') return false;
            return new Date(t.dueDate) < now;
        }).length;

        return { total, pending, inProgress, completed, overdue };
    }, [tasks]);

    return {
        tasks,
        isLoaded,
        addTask,
        updateTask,
        deleteTask,
        updateTaskStatus,
        clearAllTasks,
        getTaskStats,
    };
}
