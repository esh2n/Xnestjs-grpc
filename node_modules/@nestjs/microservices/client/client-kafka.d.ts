import { Logger } from '@nestjs/common/services/logger.service';
import { BrokersFunction, Consumer, ConsumerGroupJoinEvent, EachMessagePayload, Kafka, Producer } from '../external/kafka.interface';
import { KafkaOptions, OutgoingEvent, ReadPacket, WritePacket } from '../interfaces';
import { ClientProxy } from './client-proxy';
export declare class ClientKafka extends ClientProxy {
    protected readonly options: KafkaOptions['options'];
    protected client: Kafka;
    protected consumer: Consumer;
    protected producer: Producer;
    protected logger: Logger;
    protected responsePatterns: string[];
    protected consumerAssignments: {
        [key: string]: number;
    };
    protected brokers: string[] | BrokersFunction;
    protected clientId: string;
    protected groupId: string;
    constructor(options: KafkaOptions['options']);
    subscribeToResponseOf(pattern: any): void;
    close(): Promise<void>;
    connect(): Promise<Producer>;
    bindTopics(): Promise<void>;
    createClient<T = any>(): T;
    createResponseCallback(): (payload: EachMessagePayload) => any;
    getConsumerAssignments(): {
        [key: string]: number;
    };
    protected dispatchEvent(packet: OutgoingEvent): Promise<any>;
    protected getReplyTopicPartition(topic: string): string;
    protected publish(partialPacket: ReadPacket, callback: (packet: WritePacket) => any): Function;
    protected getResponsePatternName(pattern: string): string;
    protected setConsumerAssignments(data: ConsumerGroupJoinEvent): void;
    protected initializeSerializer(options: KafkaOptions['options']): void;
    protected initializeDeserializer(options: KafkaOptions['options']): void;
}
